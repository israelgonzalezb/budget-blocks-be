
exports.up = function (knex) {
  return knex.schema.createTable('block', tbl => {
    tbl.increments()

    tbl.string('name').nullable();

    tbl.integer('limit').nullable()

    tbl.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('block')
};