const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

router.post('/register', authController.registerUser);
router.post('/register-driver', authController.registerDriver);
router.post('/login', authController.login);
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router;
