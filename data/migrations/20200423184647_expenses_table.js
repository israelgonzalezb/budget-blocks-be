
exports.up = function (knex) {
  return knex.schema.createTable('expense', tbl => {
    tbl.increments()

    tbl.string('name').nullable();

    tbl.integer('amount').nullable()

    tbl.integer('block_id').nullable()

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
  return knex.schema.dropTableIfExists('expense')
};
