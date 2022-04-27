const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getProduct = require('./product.js');
const postProduct = require('./product.js');
const putProduct = require('./product.js');

router.use('/productos', getProduct);
router.use('/productos', postProduct);
router.use('/productos', putProduct);

module.exports = router;

