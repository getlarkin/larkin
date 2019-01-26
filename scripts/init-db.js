const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  password: 'postgres',
  host: '127.0.0.1',
  database: 'drc-local',
  port: 29576,
})

throw new Error('currently not working')

client
  .connect()
  .then(() => client.query('drop database if exists "drc-local"'))
  .then(() => client.query('create database "drc-local"'))
  .catch(err => console.error(`Error: ${err.message}`))
  .finally(() => client.end())
