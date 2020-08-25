const db = require('../data/dbconnection')
const mapper = require('../router/users-model')

module.exports = {
    find,
    findById,
    update,
    remove,
    add,
    getUserByProperty

}

function find (){
    return db('property')
}

function findById(id){
    let query = db('property')
    if(id){
        return query
            .where({id})
            .first();
    }
}

function add(properties){
    return db('property')
        .insert(properties, 'id')
        .then(([id]) => findById(id))
}

function update(change, id){
    return db('property')
        .where({id})
        .update(change)
        .then(count => count > 0 ? findById(id) : null)
}
function remove(id){
    return db('property')
        .where('id', id)
        .del();
}

function getUserByProperty(userId){
    return db('property')
        .join('users')
        .where('user_id', userId)
        .then(user => user.map(task => mapper.userToBody(task)));
}

