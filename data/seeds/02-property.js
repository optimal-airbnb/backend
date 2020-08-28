
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('property').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('property').insert([
        { 
          user_id: 1,
          name: "second new home",
          description: "Nice cozy home with family swimming pool only 5 minute work to the beach",
          type: "entier home",
          location: "Jacksonville, FL",
          bedroom: 4,
          bathroom: 2.5
        },
        { 
          user_id: 1,
          name: "Front beach home",
          description: "Nice cozy home with family swimming pool only 5 minute work to the beach",
          type: "entier home",
          location: "Jacksonville, FL",
          bedroom: 4,
          bathroom: 2.5
        },
       
      ]);
    });
};
