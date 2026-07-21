const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const { validate } = require('../middleware/validate');
const {
  getCourses, getCourse, createCourse, updateCourse, deleteCourse, getDepartments,
} = require('../controllers/courseController');

const courseValidation = [
  body('courseCode').trim().notEmpty().withMessage('Course code is required'),
  body('courseName').trim().notEmpty().withMessage('Course name is required'),
  body('credits').isInt({ min: 1, max: 6 }).withMessage('Credits must be between 1 and 6'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('instructor').trim().notEmpty().withMessage('Instructor is required'),
  body('semester').isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),
];

router.get('/departments', auth, getDepartments);

router.get('/', auth, getCourses);

router.get('/:id', auth, getCourse);

router.post('/', auth, roleAuth('admin'), courseValidation, validate, createCourse);

router.put('/:id', auth, roleAuth('admin'), updateCourse);

router.delete('/:id', auth, roleAuth('admin'), deleteCourse);

module.exports = router;
