exports.up = async function(knex, Promise) {
  await knex.schema.table('containers', function(table) {
    table
      .string('status')
      .default('running')
      .notNullable()
    table
      .string('internal_container_id')
      .default('')
      .notNullable()
  })
  await knex.schema.dropTable('hostnames')
}

exports.down = async function(knex, Promise) {
  await knex.schema.createTable('hostnames', function(table) {
    table
      .increments('id')
      .notNullable()
      .primary()
    table.string('hostname').notNullable()
    table.string('container_id')
    table.timestamps()
  })
}
