import { command } from '@larkin/api/commands/command'

import { Container } from '@larkin/api/models/Container'
import { logger } from '@larkin/api/services/logger'
import { dockerRun } from '@larkin/api/facades/docker'

command('ensureDockerContainers', async () => {
  const containers = await Container.query().where({ status: 'running' })
  await Promise.all(
    containers.map(async container => {
      const internal_container_id = await dockerRun(
        container.image,
        container.proxy_port,
        (data: any) => logger.info(data.toString()),
      )

      await Container.query()
        .update({
          internal_container_id,
        })
        .where({ id: container.id })
    }),
  )
})
