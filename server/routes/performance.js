const router = require('express').Router();
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const performanceController = require('../controllers/performanceController');

router.get('/', auth, performanceController.getAllPerformances);
router.get('/stats', auth, performanceController.getPerformanceStats);
router.get('/grade-distribution', auth, performanceController.getGradeDistribution);
router.get('/:studentId', auth, performanceController.getPerformanceByStudent);
router.post('/', auth, roleAuth('admin', 'teacher'), performanceController.createPerformance);
router.put('/:id', auth, roleAuth('admin', 'teacher'), performanceController.updatePerformance);
router.delete('/:id', auth, roleAuth('admin'), performanceController.deletePerformance);

module.exports = router;
