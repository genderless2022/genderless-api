const express = require('express');
const router = express.Router();

const checkAuth = require('../Middleware/auth');
const checkRoles = require('../Middleware/roleAuth');

const postUser = require('../Controllers/UserControllers/postUser');
router.post('/', postUser);

const getUsers = require('../Controllers/UserControllers/getUsers');
router.get('/', getUsers);

const putUserInfo = require('../Controllers/UserControllers/putUserInfo');
router.put('/', checkAuth, checkRoles(['admin', 'user']), putUserInfo);

const putUserPassword = require('../Controllers/UserControllers/putUserPassw');
router.put('/password', checkAuth, checkRoles(['admin', 'user']), putUserPassword);

const login = require('../Controllers/UserControllers/loginUser');
router.post('/login', login);

const logout = require('../Controllers/UserControllers/logoutUser');
router.post('/logout', logout);

const getUserInfo = require('../Controllers/UserControllers/getUserInfo');
router.get('/email/:email',  checkAuth, checkRoles(['user', 'admin']), getUserInfo);

const putUserRol = require('../Controllers/UserControllers/putUserRol');
router.put('/rol', checkAuth, checkRoles(['admin']), putUserRol);

const deleteUser = require('../Controllers/UserControllers/deleteUser');
router.delete('/:email', deleteUser);

const addProductToFavorites = require('../Controllers/FavoritesControllers/addProductToFavorites');
router.post('/favorites', addProductToFavorites);

const getProductFromFavorites = require('../Controllers/FavoritesControllers/getProductFromFavorites');
router.get('/favorites/:email', getProductFromFavorites);

const deleteProductFromFavorites = require('../Controllers/FavoritesControllers/deleteProductFromFavorites')
router.delete('/favorites/:email/:productId', deleteProductFromFavorites);

const addProductToShpppingCart = require('../Controllers/ShoppingCartControllers/addProductToShoppingCart');
router.post('/shoppingcart', addProductToShpppingCart);

const getProductFromShoppingCart = require('../Controllers/ShoppingCartControllers/getProductFromShoppingCart');
router.get('/shoppingcart/:email', getProductFromShoppingCart);

const putProductToShoppingCart = require('../Controllers/ShoppingCartControllers/putProductToShoppingCart');
router.put('/shoppingcart', putProductToShoppingCart);

const deleteProductFromShoppingCart = require('../Controllers/ShoppingCartControllers/deleteProductFromShoppingCart');
router.delete('/shoppingcart/:email/:productId', deleteProductFromShoppingCart);

const deleteAllProductsShoppingCart = require('../Controllers/ShoppingCartControllers/deleteAllProductsFromShoppingCart');
router.delete('/deleteshoppingcart/:email', deleteAllProductsShoppingCart);

const userForgotPassword = require('../Controllers/UserControllers/userForgotPassword');
router.post('/forgotpassword', userForgotPassword);

const addReview = require('../Controllers/ReviewsControllers/addReview');
router.post('/review',  addReview);

const getReviews = require('../Controllers/ReviewsControllers/getReviews');
router.get('/reviews', checkAuth, checkRoles(['admin', 'user']), getReviews);

const getReview = require('../Controllers/ReviewsControllers/getReview');
router.get('/review/:productId', getReview);

const deleteReview = require('../Controllers/ReviewsControllers/deleteReview')
router.delete('/review/:email/:productId', deleteReview);

const deleteReviewById = require('../Controllers/ReviewsControllers/deleteReviewById')
router.delete('/review/:id', deleteReviewById);

const newsletter = require('../Controllers/NewsletterControllers/newsletter');
router.post('/newsletter', newsletter);

const newsProductFavorite = require('../Controllers/NewsletterControllers/nesletterFavorites');
router.post('/newsletterfavorites', newsProductFavorite);

const unsubscribeNewsletter = require('../Controllers/NewsletterControllers/unsubscribeNewsletter');
router.post('/unsubscribe/:email', unsubscribeNewsletter);

module.exports = router;