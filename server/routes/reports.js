const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getSummary, getGradeReport, getStudentComparison, exportCSV, exportPDFReport,
} = require('../controllers/reportController');

router.get('/summary', auth, getSummary);

router.get('/grades', auth, getGradeReport);

router.get('/compare', auth, getStudentComparison);

router.get('/export/csv', auth, exportCSV);

router.get('/export/pdf', auth, exportPDFReport);

module.exports = router;
