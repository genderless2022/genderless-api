const express = require("express");
const router = express.Router();

const getProduct= require('../Controllers/ProductControllers/getProduct');
const postProduct = require("../Controllers/ProductControllers/postProduct");
const putProduct = require("../Controllers/ProductControllers/putProduct");
const getProductByName = require("../Controllers/ProductControllers/nameProduct");
const getProductById = require("../Controllers/ProductControllers/idProduct");
const getProductMarca = require("../Controllers/ProductControllers/getMarcaFilter");
const getPriceFilter = require("../Controllers/ProductControllers/getPrecioFilter");
const productByCategory = require("../Controllers/ProductControllers/getCategoryFilter");
const discountFilter = require("../Controllers/ProductControllers/getDiscountFilter");
const getMostSell = require("../Controllers/ProductControllers/getMostSell");

router.get("/sell", getMostSell);
router.get("/discount", discountFilter);
router.get("/categoria/:categoria", productByCategory);
router.get("/price/:price", getPriceFilter);
router.get("/marca/:marca", getProductMarca);
router.get("/id/:id", getProductById);
router.get("/name/:name", getProductByName);
router.get('/', getProduct);
router.post("/", postProduct);
router.put("/putproduct", putProduct);

module.exports = router;
