
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @description    Register user & get token
// @access  Public
router.post('/register', authController.registerUser);

// @route   POST api/auth/login
// @description    Authenticate user & get token
// @access  Public
router.post('/login', authController.loginUser);

// @route   GET api/auth
// @description    Get user data
// @access  Private
router.get('/', auth, authController.getUser);

module.exports = router;