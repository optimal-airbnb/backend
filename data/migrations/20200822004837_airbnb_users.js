
exports.up = function(knex) {
    return knex.schema.createTable('users', user => {
        user.increment('id');

        user.string('name', 256).notNullable();
        user.string('username', 256).notNullable().unique();
        user.string('password', 128).notNullable();
        user.string('email', 256);
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  
};
