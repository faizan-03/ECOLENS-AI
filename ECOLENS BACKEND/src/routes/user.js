const express = require('express');
const { getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const { userValidation } = require('../utils/validation');

const router = express.Router();

// @route   GET /api/user/me
router.get('/me', protect, getMe);

// @route   PUT /api/user/me
router.put('/me', protect, userValidation.updateProfile, updateProfile);

module.exports = router;