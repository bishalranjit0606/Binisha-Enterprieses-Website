const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', authController.login);

// @route   GET api/auth/user
// @desc    Get auth user (verify token)
// @access  Private
router.get('/user', authMiddleware, (req, res) => {
    res.json({ id: 'admin', email: 'pathlaiya123@gmail.com' });
});

module.exports = router;
