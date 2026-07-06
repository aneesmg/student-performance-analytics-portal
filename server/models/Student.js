const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: [true, 'Student name is required'], trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  course: { type: String, required: true, trim: true },
  semester: { type: Number, required: true, min: 1 },
  enrollmentYear: { type: Number, required: true },
  guardianName: { type: String, trim: true },
  guardianPhone: { type: String, trim: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
