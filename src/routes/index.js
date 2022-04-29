const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getProduct = require('./product.js');

const postUser = require('./user');
router.use('/usuario', postUser);

const getUsers = require('./user');
router.use('/usuarios', getUsers);

const getUserInfo = require('./user');
router.use('/usuario', getUserInfo);

const putUserInfo  = require('./user');
router.use('/usuario', putUserInfo);

const putUserPassword = require('./user');
router.use('/usuario', putUserPassword);

const login = require('./user');
router.use('/usuario', login);

const logout = require('./user');
router.use('/usuario', logout);

const putUserRol = require('./user');
router.use('/usuario', putUserRol);

const deleteUser = require('./user');
router.use('/usuario', deleteUser);


const postProduct = require('./product.js');

const putProduct = require('./product.js');

router.use('/productos', getProduct);
router.use('/productos', postProduct);
router.use('/productos', putProduct);

module.exports = router;

