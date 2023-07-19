const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/validateToken');

const { createUser, loginUser } = require('../controllers/user.controller');

router.post('/create-user', createUser)

router.post('/login-user', loginUser)

module.exports = router;