const router = require('express').Router();
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const validate = require('../middleware/validate');
const { body } = require('express-validator');
const studentController = require('../controllers/studentController');

router.get('/', auth, studentController.getAllStudents);
router.get('/:id', auth, studentController.getStudentById);

router.post('/', auth, roleAuth('admin', 'teacher'), [
  body('studentId').notEmpty().withMessage('Student ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('course').notEmpty().withMessage('Course is required'),
  body('semester').isInt({ min: 1 }).withMessage('Valid semester is required'),
  body('enrollmentYear').isInt().withMessage('Enrollment year is required'),
], validate, studentController.createStudent);

router.put('/:id', auth, roleAuth('admin', 'teacher'), studentController.updateStudent);
router.delete('/:id', auth, roleAuth('admin'), studentController.deleteStudent);

module.exports = router;
