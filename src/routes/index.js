const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const postProduct = require("./product.js");
const putProduct = require("./product.js");
const nameProduct = require("./product.js");
const productId = require("./product.js");

router.use("/id", productId);
router.use("/nameProducts", nameProduct);
router.use("/productos", postProduct);
router.use("/productos", putProduct);

module.exports = router;
