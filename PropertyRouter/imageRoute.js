const express = require('express');
const Property = require('../PropertyRouter/property-model');
const ImageDb = require('../PropertyRouter/image-model')
const db = require('../data/dbconnection')
const router = express.Router();
// get all image from every property
router.get('/', (req, res) => {

  ImageDb.get()
    .then(image => {
      res.status(200).json(image)
    })
    .catch(err => {
      console.log(err)
      res.status(500)
      .json({
        message: "Error while you are in process can not get data"
      })
    })

});

// get image by image Id
router.get('/:id', validateImageId, (req, res) => {
  // do your magic!
  ImageDb.get(req.image.id)
  .then(imageId => {
    res.status(201).json(imageId)
  })
  .catch(err => {
    console.log(err)
    res.status(500)
    .json({
      message: "Error while you are in process can not get data"
    })
  })
});

// get the image by implement property_id
router.get('/:id/property', validateImageId, (req, res) => {
    const { id } = req.params;
    ImageDb.getImageProperty(id)
    .then(property => {
      if (property) {
        res.json(property);
      } else {
        res.status(404).json({ message: 'Could not find image for given property' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get property by image id' });
    });
  });
  
  router.post('/',(req, res) => {
    const imageData = req.body;
    ImageDb.insert(imageData)
    .then(img => {
      res.status(201).json(img);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to add image' });
    });
  });

// add the picture direct to the property by implement the property Id without pass the property_Id
router.post('/:id', validateProperty, ( req, res) => {
   
    const id = req.params.id; 
      console.log(req.params.id)
      const image = req.body;
      image.property_id = Number(id);
  ImageDb.insert(image)
      .then(act => {
        res.status(201).json(act)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error while you are in process can not save data"})
      })
   
  });

router.delete('/:id', validateImageId, (req, res) => {
    const id = req.params.id
  const body = req.body
  ImageDb.remove(id)
  .then(move => {
    if(move > 0){
      res.status(200).json({
        removed: `property id ${id}`
      })
    }else{
      res.status(404)
      .json({
        message: "Can not found image"
      })
    }
   
  })
  .catch(err =>{
     res.status(500)
     .json({
    message: " Error while processing to remove the image"
  }, err)
  })

});

router.put('/:id', validateImageId, (req, res) => {
  
  const newUpdate = req.body;
  ImageDb.update(req.image.id, newUpdate)
      .then(actionUpdate => {
          res.status(201).json(actionUpdate)
      })
      .catch(err => {
          res.status(500).json({ error: "The image information could not be modified." })
      })
});

// custom middleware

function validateProperty(req, res, next) {
  
    Property.findById(req.params.id)
      .then(property => {
        if(property){
          req.property = property;
          next();
        }else if (!property){
          res.status(400).json({ message: "invalid property id" })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: "Err while get Id"
        })
      })
  }

  function validateImageId(req, res, next) {
    // do your magic!
    ImageDb.get(req.params.id)
    .then(image => {
      if(image){
        req.image = image;
        next();
      }else if (!image){
        res.status(400).json({ message: "invalid image id" })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Err while get Id"
      })
    })
  }

module.exports = router