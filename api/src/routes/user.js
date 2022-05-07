const express = require('express');
const router = express.Router();

const checkAuth = require('../Middleware/auth');
const checkRoles = require('../Middleware/roleAuth');

const postUser = require('../Controllers/UserControllers/postUser');
router.post('/', postUser);

const getUsers = require('../Controllers/UserControllers/getUsers');
router.get('/', getUsers);

const putUserInfo = require('../Controllers/UserControllers/putUserInfo');
router.put('/', putUserInfo);

const putUserPassword = require('../Controllers/UserControllers/putUserPassw');
router.put('/password', putUserPassword);

const login = require('../Controllers/UserControllers/loginUser');
router.post('/login', login);

const logout = require('../Controllers/UserControllers/logoutUser');
router.get('/logout', logout);

const getUserInfo = require('../Controllers/UserControllers/getUserInfo');
router.get('/email/:email', checkAuth, checkRoles(['admin', 'user']), getUserInfo);

const putUserRol = require('../Controllers/UserControllers/putUserRol');
router.put('/rol', putUserRol);

const deleteUser = require('../Controllers/UserControllers/deleteUser');
router.delete('/:email', deleteUser);
router.get('/info', checkAuth, checkRoles(['admin', 'user']), getUserInfo);

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

const deleteProductFromShoppingCart = require('../Controllers/ShoppingCartControllers/deleteProductFromShoppingCart');
router.delete('/shoppingcart/:email/:productId', deleteProductFromShoppingCart);

const deleteAllProductsShoppingCart = require('../Controllers/ShoppingCartControllers/deleteAllProductsFromShoppingCart');
router.delete('/deleteshoppingcart/:email', deleteAllProductsShoppingCart);

const userForgotPassword = require('../Controllers/UserControllers/userForgotPassword');
router.post('/forgotpassword', userForgotPassword);

const addReview = require('../Controllers/ReviewsControllers/addReview');
router.post('/review', addReview);

const getReviews = require('../Controllers/ReviewsControllers/getReviews');
router.get('/reviews', getReviews);

const getReview = require('../Controllers/ReviewsControllers/getReview');
router.get('/review', getReview);

const deleteReview = require('../Controllers/ReviewsControllers/deleteReview')
router.delete('/review', deleteReview);

const deleteReviewById = require('../Controllers/ReviewsControllers/deleteReviewById')
router.delete('/review/:id', deleteReviewById);

const newsletter = require('../Controllers/NewsletterControllers/newsletter');
router.post('/newsletter', newsletter);

const newsProductFavorite = require('../Controllers/NewsletterControllers/nesletterFavorites');
router.post('/newsletterfavorites', newsProductFavorite);

const unsubscribeNewsletter = require('../Controllers/NewsletterControllers/unsubscribeNewsletter');
router.post('/unsubscribe/:email', unsubscribeNewsletter);

module.exports = router;