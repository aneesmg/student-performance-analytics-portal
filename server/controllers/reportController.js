const Performance = require('../models/Performance');
const Student = require('../models/Student');
const { AppError } = require('../middleware/errorHandler');
const fs = require('fs');
const path = require('path');

exports.getSummary = async (req, res, next) => {
  try {
    const stats = await Performance.aggregate([
      {
        $group: {
          _id: null,
          totalStudents: { $addToSet: '$student' },
          totalRecords: { $sum: 1 },
          avgScore: { $avg: '$overallPercentage' },
          avgAttendance: { $avg: '$attendance' },
          maxScore: { $max: '$overallPercentage' },
          minScore: { $min: '$overallPercentage' },
          passCount: { $sum: { $cond: [{ $eq: ['$status', 'pass'] }, 1, 0] } },
          failCount: { $sum: { $cond: [{ $eq: ['$status', 'fail'] }, 1, 0] } },
        },
      },
    ]);

    const subjectPerformances = await Performance.aggregate([
      {
        $group: {
          _id: '$course',
          avgScore: { $avg: '$overallPercentage' },
          avgAttendance: { $avg: '$attendance' },
          studentCount: { $sum: 1 },
          passCount: { $sum: { $cond: [{ $eq: ['$status', 'pass'] }, 1, 0] } },
        },
      },
      { $sort: { avgScore: -1 } },
    ]);

    const summary = stats[0] || {};
    const totalStudents = summary.totalStudents ? summary.totalStudents.length : 0;

    res.json({
      success: true,
      data: {
        summary: {
          totalStudents,
          totalRecords: summary.totalRecords || 0,
          averageScore: parseFloat((summary.avgScore || 0).toFixed(1)),
          averageAttendance: parseFloat((summary.avgAttendance || 0).toFixed(1)),
          highestScore: summary.maxScore || 0,
          lowestScore: summary.minScore || 0,
          passCount: summary.passCount || 0,
          failCount: summary.failCount || 0,
          passRate: summary.totalRecords
            ? parseFloat(((summary.passCount / summary.totalRecords) * 100).toFixed(1))
            : 0,
        },
        subjectPerformances,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getGradeReport = async (req, res, next) => {
  try {
    const { course, semester } = req.query;
    const match = {};
    if (course) match.course = course;
    if (semester) match.semester = parseInt(semester);

    const gradeOrder = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];
    const distribution = await Performance.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$grade',
          count: { $sum: 1 },
          avgScore: { $avg: '$overallPercentage' },
        },
      },
    ]);

    const ordered = gradeOrder.map((g) => {
      const found = distribution.find((d) => d._id === g);
      return {
        grade: g,
        count: found ? found.count : 0,
        avgScore: found ? parseFloat(found.avgScore.toFixed(1)) : 0,
      };
    });

    const totalStudents = ordered.reduce((sum, g) => sum + g.count, 0);

    res.json({
      success: true,
      data: {
        distribution: ordered,
        totalStudents,
        filters: { course: course || 'all', semester: semester || 'all' },
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getStudentComparison = async (req, res, next) => {
  try {
    const { ids } = req.query;
    if (!ids) {
      throw new AppError('Please provide student IDs (comma-separated)', 400);
    }

    const studentIds = ids.split(',').map((id) => id.trim());
    const students = await Student.find({
      $or: [
        { _id: { $in: studentIds } },
        { studentId: { $in: studentIds } },
      ],
    }).lean();

    if (students.length === 0) {
      throw new AppError('No students found with provided IDs', 404);
    }

    const performances = await Performance.find({
      student: { $in: students.map((s) => s._id) },
    })
      .populate('student', 'name studentId course semester')
      .sort('-createdAt')
      .lean();

    const comparison = students.map((student) => {
      const studentPerfs = performances.filter(
        (p) => p.student && p.student._id.toString() === student._id.toString()
      );
      const avgScore = studentPerfs.length
        ? studentPerfs.reduce((sum, p) => sum + p.overallPercentage, 0) / studentPerfs.length
        : 0;
      return {
        student,
        records: studentPerfs,
        averageScore: parseFloat(avgScore.toFixed(1)),
        totalRecords: studentPerfs.length,
      };
    });

    res.json({
      success: true,
      data: { comparison },
    });
  } catch (error) {
    next(error);
  }
};

exports.exportCSV = async (req, res, next) => {
  try {
    const { type = 'students', course, semester } = req.query;

    let records = [];
    let headers = [];

    if (type === 'students') {
      const filter = {};
      if (course) filter.course = course;
      if (semester) filter.semester = parseInt(semester);

      const students = await Student.find(filter).lean();
      headers = ['Student ID', 'Name', 'Email', 'Course', 'Semester', 'Gender', 'Enrollment Year', 'Phone'];
      records = students.map((s) => [
        s.studentId, s.name, s.email, s.course, s.semester, s.gender, s.enrollmentYear, s.phone || '',
      ]);
    } else if (type === 'performances') {
      const filter = {};
      if (course) filter.course = course;
      if (semester) filter.semester = parseInt(semester);

      const performances = await Performance.find(filter)
        .populate('student', 'name studentId')
        .lean();

      headers = ['Student ID', 'Student Name', 'Course', 'Semester', 'Academic Year',
        'Attendance', 'Assignment', 'Quiz', 'Mid Exam', 'Final Exam', 'Overall %', 'Grade', 'Status'];
      records = performances.map((p) => [
        p.student?.studentId || 'N/A',
        p.student?.name || 'N/A',
        p.course,
        p.semester,
        p.academicYear,
        p.attendance,
        p.assignmentScore,
        p.quizScore,
        p.midExamScore,
        p.finalExamScore,
        p.overallPercentage,
        p.grade,
        p.status,
      ]);
    } else {
      throw new AppError('Invalid export type. Use "students" or "performances"', 400);
    }

    const csvContent = [
      headers.join(','),
      ...records.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${type}_export_${timestamp}.csv`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csvContent);
  } catch (error) {
    next(error);
  }
};

exports.exportPDFReport = async (req, res, next) => {
  try {
    const summary = await Performance.aggregate([
      {
        $group: {
          _id: null,
          totalStudents: { $addToSet: '$student' },
          totalRecords: { $sum: 1 },
          avgScore: { $avg: '$overallPercentage' },
          avgAttendance: { $avg: '$attendance' },
          maxScore: { $max: '$overallPercentage' },
          minScore: { $min: '$overallPercentage' },
          passCount: { $sum: { $cond: [{ $eq: ['$status', 'pass'] }, 1, 0] } },
          failCount: { $sum: { $cond: [{ $eq: ['$status', 'fail'] }, 1, 0] } },
        },
      },
    ]);

    const gradeDist = await Performance.aggregate([
      { $group: { _id: '$grade', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const subjectPerf = await Performance.aggregate([
      {
        $group: {
          _id: '$course',
          avgScore: { $avg: '$overallPercentage' },
          studentCount: { $sum: 1 },
        },
      },
      { $sort: { avgScore: -1 } },
      { $limit: 10 },
    ]);

    const s = summary[0] || {};
    const totalStudents = s.totalStudents ? s.totalStudents.length : 0;

    const report = {
      title: 'Student Performance Analytics Report',
      generatedAt: new Date().toISOString(),
      summary: {
        totalStudents,
        totalRecords: s.totalRecords || 0,
        averageScore: parseFloat((s.avgScore || 0).toFixed(1)),
        averageAttendance: parseFloat((s.avgAttendance || 0).toFixed(1)),
        highestScore: s.maxScore || 0,
        lowestScore: s.minScore || 0,
        passRate: s.totalRecords
          ? parseFloat(((s.passCount / s.totalRecords) * 100).toFixed(1))
          : 0,
      },
      gradeDistribution: gradeDist,
      topSubjects: subjectPerf,
    };

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(__dirname, '..', 'exports', `report_${timestamp}.json`);
    fs.writeFileSync(filePath, JSON.stringify(report, null, 2));

    res.json({
      success: true,
      message: 'Report generated successfully',
      data: report,
      downloadUrl: `/api/reports/download/${path.basename(filePath)}`,
    });
  } catch (error) {
    next(error);
  }
};
