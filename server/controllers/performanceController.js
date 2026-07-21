const Performance = require('../models/Performance');
const Student = require('../models/Student');
const { AppError } = require('../middleware/errorHandler');

exports.getPerformances = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      course,
      semester,
      grade,
      minScore,
      maxScore,
      sort = '-createdAt',
    } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const filter = {};

    if (search) {
      const students = await Student.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { studentId: { $regex: search, $options: 'i' } },
        ],
      }).select('_id').lean();

      const studentIds = students.map((s) => s._id);
      filter.student = { $in: studentIds };
    }

    if (course) filter.course = course;
    if (semester) filter.semester = parseInt(semester);
    if (grade) filter.grade = grade;

    if (minScore || maxScore) {
      filter.overallPercentage = {};
      if (minScore) filter.overallPercentage.$gte = parseFloat(minScore);
      if (maxScore) filter.overallPercentage.$lte = parseFloat(maxScore);
    }

    const allowedSorts = [
      'overallPercentage', '-overallPercentage',
      'createdAt', '-createdAt',
      'semester', '-semester',
      'attendance', '-attendance',
    ];
    const sortField = allowedSorts.includes(sort) ? sort : '-createdAt';

    const [performances, total] = await Promise.all([
      Performance.find(filter)
        .populate('student', 'name studentId email course semester')
        .sort(sortField)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Performance.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      message: 'Performance records retrieved successfully',
      data: {
        performances,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getStudentPerformances = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findOne({
      $or: [{ _id: studentId }, { studentId }],
    });

    if (!student) {
      throw new AppError('Student not found', 404);
    }

    const performances = await Performance.find({ student: student._id })
      .sort('-createdAt')
      .lean();

    res.json({
      success: true,
      data: {
        student,
        performances,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const stats = await Performance.aggregate([
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          averageScore: { $avg: '$overallPercentage' },
          averageAttendance: { $avg: '$attendance' },
          highestScore: { $max: '$overallPercentage' },
          lowestScore: { $min: '$overallPercentage' },
          totalPass: { $sum: { $cond: [{ $eq: ['$status', 'pass'] }, 1, 0] } },
          totalFail: { $sum: { $cond: [{ $eq: ['$status', 'fail'] }, 1, 0] } },
        },
      },
    ]);

    const gradeDistribution = await Performance.aggregate([
      {
        $group: {
          _id: '$grade',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        stats: stats[0] || {
          totalRecords: 0,
          averageScore: 0,
          averageAttendance: 0,
          highestScore: 0,
          lowestScore: 0,
          totalPass: 0,
          totalFail: 0,
        },
        gradeDistribution,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getGradeDistribution = async (req, res, next) => {
  try {
    const { course, semester } = req.query;
    const match = {};
    if (course) match.course = course;
    if (semester) match.semester = parseInt(semester);

    const distribution = await Performance.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$grade',
          count: { $sum: 1 },
          avgScore: { $avg: '$overallPercentage' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: { distribution },
    });
  } catch (error) {
    next(error);
  }
};

exports.createPerformance = async (req, res, next) => {
  try {
    const performance = await Performance.create(req.body);

    const populated = await Performance.findById(performance._id)
      .populate('student', 'name studentId email');

    res.status(201).json({
      success: true,
      message: 'Performance record created successfully',
      data: { performance: populated },
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePerformance = async (req, res, next) => {
  try {
    const { id } = req.params;

    const performance = await Performance.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate('student', 'name studentId email');

    if (!performance) {
      throw new AppError('Performance record not found', 404);
    }

    res.json({
      success: true,
      message: 'Performance record updated successfully',
      data: { performance },
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePerformance = async (req, res, next) => {
  try {
    const { id } = req.params;

    const performance = await Performance.findByIdAndDelete(id);
    if (!performance) {
      throw new AppError('Performance record not found', 404);
    }

    res.json({
      success: true,
      message: 'Performance record deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

exports.getPerformanceFilterOptions = async (req, res, next) => {
  try {
    const [courses, semesters, grades] = await Promise.all([
      Performance.distinct('course'),
      Performance.distinct('semester'),
      Performance.distinct('grade'),
    ]);

    res.json({
      success: true,
      data: {
        courses: courses.sort(),
        semesters: semesters.sort((a, b) => a - b),
        grades: grades.sort(),
      },
    });
  } catch (error) {
    next(error);
  }
};
