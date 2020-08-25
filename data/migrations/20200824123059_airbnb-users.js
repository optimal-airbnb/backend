exports.up = function (knex) {
  return knex.schema.createTable("users", (user) => {
    user.increments();

    user.string("name", 256).notNullable();
    user.string("username", 256).notNullable().unique();
    user.string("password", 128).notNullable();
    user.string("email", 256).unique();
  })
  .createTable("property", property => {
    property.increments();
    property.integer('user_id')
            .unsigned()
            .notNullable()
            .references('users.id')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');   
    property.string('name',255).notNullable().unique();
    property.string('description').notNullable();
    property.string('type').notNullable();
    property.string('location', 256).notNullable();
    property.decimal('bedroom');
    property.decimal('bathroom');  
    property.blob('image');       
  })
};

exports.down = function (knex) {
  return knex.schema
  .dropTableIfExists("property")
  .dropTableIfExists("users")
  
  
};
