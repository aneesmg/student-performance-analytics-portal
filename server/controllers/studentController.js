const Student = require('../models/Student');
const Performance = require('../models/Performance');
const { AppError } = require('../middleware/errorHandler');

exports.getStudents = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      course,
      semester,
      gender,
      enrollmentYear,
      sort = '-createdAt',
    } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (course) filter.course = course;
    if (semester) filter.semester = parseInt(semester);
    if (gender) filter.gender = gender;
    if (enrollmentYear) filter.enrollmentYear = parseInt(enrollmentYear);

    const allowedSorts = ['name', '-name', 'createdAt', '-createdAt', 'studentId', '-studentId', 'semester', '-semester'];
    const sortField = allowedSorts.includes(sort) ? sort : '-createdAt';

    const [students, total] = await Promise.all([
      Student.find(filter).sort(sortField).skip(skip).limit(limitNum).lean(),
      Student.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      message: 'Students retrieved successfully',
      data: {
        students,
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

exports.getStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await Student.findOne({
      $or: [{ _id: id }, { studentId: id }],
    }).lean();

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

exports.createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: { student },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      throw new AppError('Student not found', 404);
    }

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: { student },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      throw new AppError('Student not found', 404);
    }

    await Performance.deleteMany({ student: id });

    res.json({
      success: true,
      message: 'Student deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

exports.getFilterOptions = async (req, res, next) => {
  try {
    const [courses, semesters, genders, years] = await Promise.all([
      Student.distinct('course'),
      Student.distinct('semester'),
      Student.distinct('gender'),
      Student.distinct('enrollmentYear'),
    ]);

    res.json({
      success: true,
      data: {
        courses: courses.sort(),
        semesters: semesters.sort((a, b) => a - b),
        genders: genders.sort(),
        enrollmentYears: years.sort((a, b) => b - a),
      },
    });
  } catch (error) {
    next(error);
  }
};
