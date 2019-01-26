require('dotenv').config()

module.exports = {
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
}
