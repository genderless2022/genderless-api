const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getProduct = require('./product.js');
const postProduct = require("./product.js");
const putProduct = require("./product.js");
const getProductByName = require("./product.js");
const getProductById = require("./product.js");
const getPrice = require("./product.js")
const getCategory = require("./product.js")

const postUser = require('./user');
router.use('/usuario', postUser);

const getUsers = require('./user');
router.use('/usuarios', getUsers);

const getUserInfo = require('./user');
router.use('/usuario', getUserInfo);

router.use("/id", getProductById);
router.use("/name", getProductByName);
router.use("/productos", getCategory)
router.use("/productos", getPrice)
router.use("/productos", getProduct)
router.use("/productos", getProduct);
router.use("/productos", postProduct);
router.use("/productos", putProduct);

module.exports = router;
