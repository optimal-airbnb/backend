exports.up = function (knex) {
  return knex.schema

    .createTable("users", (user) => {
      user.increments();

      user.string("name", 256).notNullable();
      user.string("username", 256).notNullable().unique();
      user.string("password", 128).notNullable();
      user.string("email", 256).unique();
    })

    .createTable("property", (property) => {
      property.increments();
      property
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      property.string("name", 255).notNullable().unique();
      property.string("description").notNullable();
      property.string("type").notNullable();
      property.string("location", 256).notNullable();
      property.decimal("bedroom");
      property.decimal("bathroom");
    })

    .createTable("property_image", (img) => {
      img.increments();
      img
        .integer("property_id")
        .unsigned()
        .notNullable()
        .references("property.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      img.blob("image");
    })

    .createTable("price", (price) => {
      price.increments();
        price.integer("property_id")
        .unsigned()
        .notNullable()
        .references("property.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      price.string('Borough').notNullable();
      price.string('Neighbourhood').notNullable();
      price.string('Room_type').notNullable();
      price.integer('Minimm-nights').notNullable();
      price.integer('Availability_365').notNullable();  
      price.string("optimal-price")
      ;
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("price")
    .dropTableIfExists("property_image")
    .dropTableIfExists("property")
    .dropTableIfExists("users");
  
};
