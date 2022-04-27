const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);








const postUser = require('./user');
router.use('/usuario', postUser);
const getUsers = require('./user');
router.use('/usuarios', getUsers);
module.exports = router;
