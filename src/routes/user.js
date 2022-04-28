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
module.exports = router;