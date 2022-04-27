const express = require('express');
const router = express.Router();



const postProduct = require('../Controllers/ProductControllers/postProduct');
const putProduct = require('../Controllers/ProductControllers/putProduct');
const getProduct=require('../Controllers/ProductControllers/getProduct');

router.get('/', getProduct);
router.post('/', postProduct)
router.put('/putproduct', putProduct);

module.exports = router;