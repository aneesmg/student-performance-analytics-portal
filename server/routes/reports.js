const router = require('express').Router();
const auth = require('../middleware/auth');
const performanceController = require('../controllers/performanceController');

router.get('/summary', auth, performanceController.getPerformanceStats);
router.get('/grades', auth, performanceController.getGradeDistribution);

module.exports = router;
