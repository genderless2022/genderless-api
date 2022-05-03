const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getProduct = require('./product.js');
router.use("/productos", getProduct);

const getUsers = require('./user');
router.use('/usuarios', getUsers);

const addProductToFavorites = require('./user.js');
router.use('/usuario', addProductToFavorites);

const getProductFromFavorites = require('./user.js');
router.use('/usuario', getProductFromFavorites);

const deleteProductFromFavorites = require('./user.js');
router.use('/usuario', deleteProductFromFavorites);



module.exports = router;
