const db = require('../data/dbconnection');
const mappers = require('../router/mapper.js');

module.exports = {
  get,
  insert,
  update,
  remove,
  getPropertyPrice,
  findProperty
};

function get(id) {
  let query = db('price');

  if (id) {
    return query
      .where('id', id)
      .first()
      .then((image) => {
        if (image) {
          return mappers.imageTobody(image);
        } else {
          return null;
        }
      });
  } else {
    return query.then((image) => {
      return image.map((resource) => mappers.imageTobody(resource));
    });
  }
}

function insert(price) {
  return db('price')
    .insert(price, 'id')
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db('price')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db('price').where('id', id).del();
}
// find project by image Id
function findProperty(id){
    let query = db('property');
    if(id) {
        query
        .join('price')
        .where('property.id', id)
        .first();
        const promise = [query, getPropetyImage(id)];
        return Promise.all(promise)
            .then( results => {
                const [propety,  images] = results;
                if (property){
                    property.images= images;
                    return mappers.imagesTobody(projects);
                }else{
                    return null;
                }
            });
        
    }else{
        return query.then(property=> {
            return property.map(pro => mappers.imagesTobody(pro));
        })
    }
    
}
function getPropertyPrice (userId){
    return db('users')
    .join('price')
    .where('price.id',userId)
    .then(price => price.map(image => mappers.priceTobody(image)));
}