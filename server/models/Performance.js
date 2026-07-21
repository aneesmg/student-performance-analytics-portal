const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Student reference is required'],
  },
  course: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
  },
  semester: {
    type: Number,
    required: [true, 'Semester is required'],
    min: 1,
    max: 8,
  },
  academicYear: {
    type: String,
    required: [true, 'Academic year is required'],
    trim: true,
  },
  attendance: {
    type: Number,
    required: [true, 'Attendance is required'],
    min: [0, 'Attendance cannot be negative'],
    max: [100, 'Attendance cannot exceed 100'],
  },
  assignmentScore: {
    type: Number,
    required: [true, 'Assignment score is required'],
    min: [0, 'Score cannot be negative'],
    max: [100, 'Score cannot exceed 100'],
  },
  quizScore: {
    type: Number,
    required: [true, 'Quiz score is required'],
    min: [0, 'Score cannot be negative'],
    max: [100, 'Score cannot exceed 100'],
  },
  midExamScore: {
    type: Number,
    required: [true, 'Mid exam score is required'],
    min: [0, 'Score cannot be negative'],
    max: [100, 'Score cannot exceed 100'],
  },
  finalExamScore: {
    type: Number,
    required: [true, 'Final exam score is required'],
    min: [0, 'Score cannot be negative'],
    max: [100, 'Score cannot exceed 100'],
  },
  overallPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  grade: {
    type: String,
    required: [true, 'Grade is required'],
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'],
  },
  remarks: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['pass', 'fail'],
    default: 'pass',
  },
}, {
  timestamps: true,
});

performanceSchema.index({ student: 1 });
performanceSchema.index({ course: 1 });
performanceSchema.index({ semester: 1 });
performanceSchema.index({ grade: 1 });
performanceSchema.index({ overallPercentage: -1 });

module.exports = mongoose.model('Performance', performanceSchema);
