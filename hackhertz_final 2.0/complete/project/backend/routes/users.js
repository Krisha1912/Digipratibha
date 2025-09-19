 const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.put('/profile', auth.isAuthenticated, userController.updateProfile);
router.post('/portfolio', auth.isAuthenticated, auth.isStudent, userController.createPortfolio);
router.post('/approve-student/:studentId', auth.isAuthenticated, auth.isInstitute, userController.approveStudent);
router.post('/reject-student/:studentId', auth.isAuthenticated, auth.isInstitute, userController.rejectStudent);

module.exports = router;