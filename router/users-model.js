const db = require("../data/dbconnection");
const mappers = require("./mapper.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
};

function find(id) {
  // return db("users");
  let query = db("users");

  if (id) {
    return query
      .where("id", id)
      .first()
      .then((users) => {
        if (users) {
          return mappers.userTobody(users);
        } else {
          return null;
        }
      });
  } else {
    return query.then((users) => {
      return users.map((user) => mappers.userTobody(user));
    });
  }
}
function findById(id) {
  let query = db("users");

  if (id) {
    return query.where({ id }).first();
  } else {
    return null;
  }
}

function findBy(filter) {
  return db("users as u").where(filter).orderBy("id");
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(([id]) => findById(id));
}

function update(changes, id) {
  console.log(changes, id);
  return db("users")
    .where({ id })
    .update(changes)
    .then((count) => (count > 0 ? find(id) : null));
}
function remove(id) {
  return db("users").where("id", id).del();
}
