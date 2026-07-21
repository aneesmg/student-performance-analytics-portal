const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const { validate } = require('../middleware/validate');
const {
  getStudents, getStudent, createStudent, updateStudent, deleteStudent, getFilterOptions,
} = require('../controllers/studentController');

const studentValidation = [
  body('studentId').trim().notEmpty().withMessage('Student ID is required'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
  body('course').trim().notEmpty().withMessage('Course/department is required'),
  body('semester').isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),
  body('enrollmentYear').isInt({ min: 2000 }).withMessage('Valid enrollment year is required'),
];

router.get('/filter-options', auth, getFilterOptions);

router.get('/', auth, getStudents);

router.get('/:id', auth, getStudent);

router.post('/', auth, roleAuth('admin', 'teacher'), studentValidation, validate, createStudent);

router.put('/:id', auth, roleAuth('admin', 'teacher'), updateStudent);

router.delete('/:id', auth, roleAuth('admin'), deleteStudent);

module.exports = router;
