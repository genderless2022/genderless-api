const express = require("express");
const router = express.Router();

const postProduct = require("../Controllers/ProductControllers/postProduct");
const putProduct = require("../Controllers/ProductControllers/putProduct");
const getProductByName = require("../Controllers/ProductControllers/nameProduct");
const getProductById = require("../Controllers/ProductControllers/idProduct");

router.get("/productId", getProductById);
router.get("/getname", getProductByName);
router.post("/", postProduct);
router.put("/putproduct", putProduct);

module.exports = router;
