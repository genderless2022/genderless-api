const express = require('express');
const router = express.Router();

const postUser = require('../Controllers/UserControllers/postUser');
router.post('/', postUser);

const getUsers = require('../Controllers/UserControllers/getUsers');
router.get('/', getUsers);

module.exports = router;