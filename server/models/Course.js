const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true, trim: true },
  courseName: { type: String, required: true, trim: true },
  credits: { type: Number, required: true, min: 1 },
  department: { type: String, required: true, trim: true },
  instructor: { type: String, trim: true },
  semester: { type: Number, required: true },
  description: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
