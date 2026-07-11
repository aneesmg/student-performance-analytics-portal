const router = require('express').Router();
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const validate = require('../middleware/validate');
const { body } = require('express-validator');
const courseController = require('../controllers/courseController');

router.get('/', auth, courseController.getAllCourses);
router.get('/:id', auth, courseController.getCourseById);

router.post('/', auth, roleAuth('admin'), [
  body('courseCode').notEmpty().withMessage('Course code is required'),
  body('courseName').notEmpty().withMessage('Course name is required'),
  body('credits').isInt({ min: 1 }).withMessage('Credits must be at least 1'),
  body('department').notEmpty().withMessage('Department is required'),
  body('semester').isInt({ min: 1 }).withMessage('Semester is required'),
], validate, courseController.createCourse);

router.put('/:id', auth, roleAuth('admin'), courseController.updateCourse);
router.delete('/:id', auth, roleAuth('admin'), courseController.deleteCourse);

module.exports = router;
