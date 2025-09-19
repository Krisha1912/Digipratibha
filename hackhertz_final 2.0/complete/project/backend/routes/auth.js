 const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validation = require('../middleware/validation');

router.post('/signup', validation.validateSignup, authController.signup);
router.post('/login', validation.validateLogin, authController.login);
router.get('/logout', authController.logout);

module.exports = router;