 const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

router.get('/student', auth.isAuthenticated, auth.isStudent, dashboardController.getStudentDashboard);
router.get('/institute', auth.isAuthenticated, auth.isInstitute, dashboardController.getInstituteDashboard);

module.exports = router;