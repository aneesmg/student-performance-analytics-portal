const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, 'Course code is required'],
    unique: true,
    trim: true,
  },
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
    maxlength: [100, 'Course name cannot exceed 100 characters'],
  },
  credits: {
    type: Number,
    required: [true, 'Credits are required'],
    min: [1, 'Credits must be at least 1'],
    max: [6, 'Credits cannot exceed 6'],
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
  },
  instructor: {
    type: String,
    required: [true, 'Instructor name is required'],
    trim: true,
  },
  semester: {
    type: Number,
    required: [true, 'Semester is required'],
    min: 1,
    max: 8,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

courseSchema.index({ courseCode: 1 });
courseSchema.index({ department: 1 });
courseSchema.index({ courseName: 'text', courseCode: 'text' });

module.exports = mongoose.model('Course', courseSchema);
