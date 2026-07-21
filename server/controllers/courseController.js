const Course = require('../models/Course');
const { AppError } = require('../middleware/errorHandler');

exports.getCourses = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search, department, sort = 'courseName' } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const filter = {};
    if (search) {
      filter.$or = [
        { courseName: { $regex: search, $options: 'i' } },
        { courseCode: { $regex: search, $options: 'i' } },
      ];
    }
    if (department) filter.department = department;

    const allowedSorts = ['courseName', '-courseName', 'department', '-department', 'credits', '-credits'];
    const sortField = allowedSorts.includes(sort) ? sort : 'courseName';

    const [courses, total] = await Promise.all([
      Course.find(filter).sort(sortField).skip(skip).limit(limitNum).lean(),
      Course.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        courses,
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

exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findOne({
      $or: [{ _id: req.params.id }, { courseCode: req.params.id }],
    }).lean();

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    res.json({
      success: true,
      data: { course },
    });
  } catch (error) {
    next(error);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: { course },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: { course },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      throw new AppError('Course not found', 404);
    }

    res.json({
      success: true,
      message: 'Course deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

exports.getDepartments = async (req, res, next) => {
  try {
    const departments = await Course.distinct('department');
    res.json({
      success: true,
      data: { departments: departments.sort() },
    });
  } catch (error) {
    next(error);
  }
};
