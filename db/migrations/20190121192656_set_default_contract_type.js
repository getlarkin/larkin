exports.up = async function(knex, Promise) {
  await knex.table('users').update({ contract_type: 'hobby' })
  await knex.schema.table('users', function(table) {
    table
      .string('contract_type')
      .notNullable()
      .default('hobby')
      .alter()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.string('contract_type').alter()
  })
}
