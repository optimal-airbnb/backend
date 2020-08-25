const express = require('express');

const Properties = require('./property-model');
const db = require('../data/dbconnection');

const router = express.Router();

router.get('/', (req, res) => {
  Properties.find()
  .then(Properties => {
    res.json(Properties);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Properties' }, err);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Properties.findById(id)
  .then(house => {
    if (house) {
      res.json(house);
    } else {
      res.status(404).json({ message: 'Could not find house with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Properties' },err);
  });
});

// router.post('/', (req, res) => {
//   const houseData = req.body;
//   Properties.add(houseData)
//   .then(house => {
//     res.status(201).json(house);
//   })
//   .catch (err => {
//     res.status(500).json({ message: 'Failed to create new property' });
//   });
// });

router.get('/:id/resources',(req, res) => {
    const { id } = req.params;
    Properties.findResource(id)
    .then(task => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Could not find task for given property' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get tasks' });
    });
  });
  
  router.post('/', (req, res) => {
    const houseData = req.body;
    Properties.add(houseData)
    .then(house => {
      console.log(house)
      res.status(201).json(house);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new property' });
    });
  });

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Properties.findById(id)
  .then(house => {
    if (house) {
      Properties.update(changes, id)
      .then(updatedhouse => {
        res.json(updatedhouse);
      });
    } else {
      res.status(404).json({ updated:  house, Id: id});
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update property' });
  });
});

router.delete('/:id', (req, res) => {
const id = req.params.id;
const body = req.body
  Properties.remove(id)
  .then(deleted => {
    if (deleted) {
      res.status(200).json({ removed: id, body});
    } else {
      res.status(404).json({ message: 'Could not find house with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete property' });
  });
});


module.exports = router;