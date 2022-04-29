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

module.exports = router;