import * as express from 'express'
import { requireAuth } from '@larkin/api/middleware/auth'
import { Middleware } from '@larkin/api/types'
import { Container } from '@larkin/api/models/Container'
import { dockerPull, dockerRun, dockerKill } from '@larkin/api/facades/docker'
import { createDomain } from '@larkin/api/domain'
import { logger } from '@larkin/api/services/logger'
import { createNewNginxConfig, restartNginx, runCertbot } from '@larkin/api/facades/nginx'
const getPort = require('get-port')

export const router = express.Router()

router.use(requireAuth)

const withContainer: Middleware = async (req, res, next) => {
  const container = await Container.query().findById(req.params.id)
  if (!container) {
    res.status(404).send('container not found')
    throw new Error('container not found')
  }
  req.params.container = container
  next()
}

router.get('/', async (req, res) => {
  const containers = await Container.query()
    .where({ user_id: req.user.id })
    .where({ status: 'running' })
  res.send(containers)
})

router.post('/', requireAuth, async (req, res) => {
  const { image } = req.body
  const proxyPort = await getPort()

  if (!(await req.user.canCreateContainer())) {
    res.status(422).send('You are using "hobby" plan, so the limit is 1 container')
    return
  }

  const publicHostName: string = await createDomain()
  await createNewNginxConfig({ publicHostName, proxyPort, listenPort: 8080 })
  restartNginx()

  try {
    await dockerPull(image, data => logger.info(data.toString()))
  } catch (e) {
    res.status(422).send('Somthing went wrong. Try again later.')
    return
  }

  const internal_container_id = await dockerRun(image, proxyPort, (data: any) =>
    logger.info(data.toString()),
  )

  await Container.query().insert({
    user_id: req.user.id,
    internal_container_id,
    status: 'running',
    image: req.body.image,
    public_host: publicHostName,
    proxy_host: 'localhost',
    proxy_port: proxyPort,
    // command: string,
  })

  res.send('ok')
})

router.delete('/:id', requireAuth, withContainer, async (req, res) => {
  const { container } = req.params
  await dockerKill(container.internal_container_id)
  await container.$query().patch({ status: 'terminated' })
  res.send('ok')
})

router.put('/:id/public_host', withContainer, async (req, res) => {
  const { container } = req.params
  const publicHostName = req.body.public_host

  await createNewNginxConfig({
    publicHostName,
    proxyPort: container.proxy_port,
    listenPort: 80,
    ssl: true,
  })
  await restartNginx()
  await Container.query()
    .update({
      public_host: publicHostName,
    })
    .where({ id: container.id })
  await runCertbot(publicHostName)

  res.send('ok')
})
