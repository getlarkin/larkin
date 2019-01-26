exports.up = async function(knex, Promise) {
  await knex.schema.table('users', function(table) {
    table
      .string('onetime_docker_login_token')
      .default('')
      .notNullable()
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.table('users', function(table) {
    table.dropColumn('onetime_docker_login_token')
  })
}
