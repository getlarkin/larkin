require('dotenv').config()

import { logger } from '@larkin/api/services/logger'
import { Model } from 'objection'

export async function command(name: string, fn: Function) {
  logger.info(`Running: ${name}`)
  await fn()
  Model.knex().destroy()
}
