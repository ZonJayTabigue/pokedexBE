const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth/login');
const { register } = require('../controllers/auth/register');
const { logout } = require('../controllers/auth/logout');

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

module.exports = router;