exports.up = function (knex) {
  return knex.schema.createTable("users", (user) => {
    user.increments();

    user.string("name", 256).notNullable();
    user.string("username", 256).notNullable().unique();
    user.string("password", 128).notNullable();
    user.string("email", 256).unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
