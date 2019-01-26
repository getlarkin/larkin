import * as express from 'express'
import { requireAuth } from '@larkin/api/middleware/auth'
import { Container } from '@larkin/api/models/Container'
import { dockerPull, dockerRun, dockerKill } from '@larkin/api/facades/docker'
import { createDomain } from '@larkin/api/domain'
import { logger } from '@larkin/api/services/logger'
import { createNewNginxConfig, restartNginx, runCertbot } from '@larkin/api/facades/nginx'
const getPort = require('get-port')

export const router = express.Router()

router.use(requireAuth)

router.get('/', async (req, res) => {
  const containers = await Container.query()
    .where({ user_id: req.user.id })
    .where({ status: 'running' })
  res.send(containers)
})

router.post('/', requireAuth, async (req, res) => {
  const { image } = req.body
  const hostPort = await getPort()

  if (!(await req.user.canCreateContainer())) {
    res.status(422).send('You are using "hobby" plan, so the limit is 1 container')
    return
  }

  const publicHostname: string = await createDomain()
  await createNewNginxConfig(publicHostname, hostPort)
  restartNginx()

  try {
    await dockerPull(image, data => logger.info(data.toString()))
  } catch (e) {
    res.status(422).send('Somthing went wrong. Try again later.')
    return
  }

  const internal_container_id = await dockerRun(image, hostPort, (data: any) =>
    logger.info(data.toString()),
  )

  await Container.query().insert({
    user_id: req.user.id,
    internal_container_id,
    status: 'running',
    image: req.body.image,
    public_host: publicHostname,
    proxy_host: 'localhost',
    proxy_port: hostPort,
    // command: string,
  })

  res.send('ok')
})

router.delete('/:id', requireAuth, async (req, res) => {
  const container = await Container.query().findById(req.params.id)
  if (!container) {
    res.status(404).send('container not found')
    throw new Error('container not found')
  }
  await dockerKill(container.internal_container_id)
  await container.$query().patch({ status: 'terminated' })
  res.send('ok')
})

router.put('/:id/public_host', async (req, res) => {
  const container = await Container.query().findById(req.params.id)
  if (!container) {
    res.status(404).send('container not found')
    throw new Error('container not found')
  }

  const host = req.body.public_host

  await createNewNginxConfig(host || 'docker.fastestnews.org', container.proxy_port)
  await runCertbot(host || 'docker.fastestnews.org')

  res.send('ok')
})
