const axios = require('axios');

const router = require('express').Router();
const predictPrice = require('./priceModel.js');


router.post('/', (req, res) => {
   const priceData = req.body;
    predictPrice.insert(priceData)
        axios.post('https://airbnbpricer.herokuapp.com/predict',priceData)
        .then(response=> {
          console.log(response.data)
          res.status(201).json(response.data);
        
        })
        .catch(err => {
          res.status(404).json({message: "can not send data to get perdict price."})
        })
})
module.exports = router;