const express = require('express');
const router = express.Router();

const checkAuth = require('../Middleware/auth');
const checkRoles = require('../Middleware/roleAuth');

const postUser = require('../Controllers/UserControllers/postUser');
router.post('/', postUser);

const getUsers = require('../Controllers/UserControllers/getUsers');
router.get('/', getUsers);

const getUserInfo = require('../Controllers/UserControllers/getUserInfo');
router.get('/info', checkAuth, checkRoles(['admin', 'user']), getUserInfo);

const addProductToFavorites = require('../Controllers/FavoritesControllers/addProductToFavorites');
router.post('/favorites', addProductToFavorites);

const getProductFromFavorites = require('../Controllers/FavoritesControllers/getProductFromFavorites');
router.get('/favorites', getProductFromFavorites);

const deleteProductFromFavorites = require('../Controllers/FavoritesControllers/deleteProductFromFavorites')
router.delete('/favorites', deleteProductFromFavorites);

module.exports = router;