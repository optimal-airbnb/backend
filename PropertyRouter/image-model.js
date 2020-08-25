const db = require('../../dbConfig');
const mappers = require('./mappers');

module.exports = {
  get,
  insert,
  update,
  remove,
  getResourceProperty,
  findProperty
};

function get(id) {
  let query = db('property_image');

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

function insert(image) {
  return db('images')
    .insert(image, 'id')
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db('images')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db('images').where('id', id).del();
}
// find project by image Id
function findProperty(id){
    let query = db('property');
    if(id) {
        query
        .join('images')
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

function getPropetyImage (propertyId){
    return db('property')
    .join('property_image')
    .where('property_image.id',propertyId)
    .then(property => property.map(image => mappers.propertyToBody(image)));
}