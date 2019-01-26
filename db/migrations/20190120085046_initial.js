exports.up = async function(knex, Promise) {
  await knex.schema.createTable('users', function(table) {
    table
      .uuid('id')
      .notNullable()
      .primary()
    table.string('name')
    table.string('email').notNullable()
    table.string('avatar_url')
    table.string('contract_type')
    table.string('github_id').notNullable()
    table.string('github_url').notNullable()
    table.string('github_access_token').notNullable()
    table.string('github_refresh_token')
    table.timestamps()
  })

  await knex.schema.createTable('containers', function(table) {
    table
      .uuid('id')
      .notNullable()
      .primary()
    table.uuid('user_id').notNullable()
    table.string('image').notNullable()
    table.string('command')
    table.string('public_host').notNullable()
    table.string('proxy_host').notNullable()
    table
      .integer('proxy_port')
      .unsigned()
      .notNullable()
    table.timestamps()
  })

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

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('containers')
  await knex.schema.dropTable('containers')
}
