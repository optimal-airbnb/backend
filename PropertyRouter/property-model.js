const db = require('../data/dbconnection')
const mapper = require('../router/mapper.js')

module.exports = {
    find,
    findById,
    update,
    remove,
    add,
    getUserByProperty,
    findImage

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

function findImage(id){
    let query = db('property_image');
    if(id) {
        query
        .join('property')
        .where('property.id', id)
        .first();
        const promise = [query, getPropetyImage(id)];
        return Promise.all(promise)
            .then( results => {
                const [property,  image] = results;
                if (property){
                    property.image = image;
                    return mapper.propertyTobody(property);
                }else{
                    return null;
                }
            });
        
    }else{
        return query.then(property=> {
            return property.map(pro => mapper.propertyTobody(pro));
        })
    }
    
}
function getPropetyImage (propertyId){
    return db('property')
    .join('property_image')
    .where('property_image.id',propertyId)
    .then(property => property.map(image => mappers.propertyToBody(image)));
}