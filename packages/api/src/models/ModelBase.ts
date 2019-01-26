import { Model } from 'objection'
import * as Knex from 'knex'
import * as uuid from 'uuid'
const knexTinyLogger = require('knex-tiny-logger').default

export const knex = Knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds/test',
  },
  useNullAsDefault: true,
})

Model.knex(knex)
knexTinyLogger(knex)

export class ModelBase extends Model {
  id!: string
  created_at!: string
  updated_at!: string

  $beforeInsert() {
    this.id = uuid()
    this.created_at = new Date().toISOString()
    this.updated_at = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString()
  }
}
