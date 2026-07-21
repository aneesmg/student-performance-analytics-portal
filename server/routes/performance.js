const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const { validate } = require('../middleware/validate');
const {
  getPerformances, getStudentPerformances, getStats, getGradeDistribution,
  createPerformance, updatePerformance, deletePerformance, getPerformanceFilterOptions,
} = require('../controllers/performanceController');

const performanceValidation = [
  body('student').isMongoId().withMessage('Valid student ID is required'),
  body('course').trim().notEmpty().withMessage('Course name is required'),
  body('semester').isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),
  body('academicYear').trim().notEmpty().withMessage('Academic year is required'),
  body('attendance').isFloat({ min: 0, max: 100 }).withMessage('Attendance must be between 0 and 100'),
  body('assignmentScore').isFloat({ min: 0, max: 100 }).withMessage('Assignment score must be between 0 and 100'),
  body('quizScore').isFloat({ min: 0, max: 100 }).withMessage('Quiz score must be between 0 and 100'),
  body('midExamScore').isFloat({ min: 0, max: 100 }).withMessage('Mid exam score must be between 0 and 100'),
  body('finalExamScore').isFloat({ min: 0, max: 100 }).withMessage('Final exam score must be between 0 and 100'),
];

router.get('/filter-options', auth, getPerformanceFilterOptions);

router.get('/stats', auth, getStats);

router.get('/grade-distribution', auth, getGradeDistribution);

router.get('/', auth, getPerformances);

router.get('/:studentId', auth, getStudentPerformances);

router.post('/', auth, roleAuth('admin', 'teacher'), performanceValidation, validate, createPerformance);

router.put('/:id', auth, roleAuth('admin', 'teacher'), updatePerformance);

router.delete('/:id', auth, roleAuth('admin'), deletePerformance);

module.exports = router;
