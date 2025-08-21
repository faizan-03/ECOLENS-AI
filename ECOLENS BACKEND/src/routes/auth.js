const express = require('express');
const { register, login } = require('../controllers/authController');
const { userValidation } = require('../utils/validation');

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', userValidation.register, register);

// @route   POST /api/auth/login
router.post('/login', userValidation.login, login);

module.exports = router;