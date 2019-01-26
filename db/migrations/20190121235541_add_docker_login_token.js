exports.up = async function(knex, Promise) {
  await knex.schema.table('users', function(table) {
    table
      .string('api_token')
      .default('')
      .notNullable()
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.table('users', function(table) {
    table.dropColumn('api_token')
  })
}
