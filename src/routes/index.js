const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getProduct = require('./product.js');
const postProduct = require("./product.js");
const putProduct = require("./product.js");
const nameProduct = require("./product.js");
const productId = require("./product.js");

const postUser = require('./user');
router.use('/usuario', postUser);

const getUsers = require('./user');
router.use('/usuarios', getUsers);

const getUserInfo = require('./user');
router.use('/usuario', getUserInfo);

router.use("/id", productId);
router.use("/nameProducts", nameProduct);
router.use('/productos', getProduct);
router.use("/productos", postProduct);
router.use("/productos", putProduct);

module.exports = router;
