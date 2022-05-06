const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const mercado = require("./mercadopago")

router.use("/mercado", mercado)

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

const addReview = require('./user.js')
router.use('/usuario', addReview);

const getReviews = require('./user.js')
router.use('/usuario', getReviews);

const getReview = require('./user.js')
router.use('/usuario', getReview);

const deleteReview = require('./user.js')
router.use('/usuario', deleteReview);

const deleteReviewById = require('./user.js')
router.use('/usuario', deleteReviewById);





module.exports = router;
