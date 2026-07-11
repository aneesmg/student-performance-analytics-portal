const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: String, required: true },
  semester: { type: Number, required: true },
  academicYear: { type: String, required: true },
  attendance: { type: Number, min: 0, max: 100, default: 0 },
  assignmentScore: { type: Number, min: 0, max: 100, default: 0 },
  quizScore: { type: Number, min: 0, max: 100, default: 0 },
  midExamScore: { type: Number, min: 0, max: 100, default: 0 },
  finalExamScore: { type: Number, min: 0, max: 100, default: 0 },
  overallPercentage: { type: Number, min: 0, max: 100, default: 0 },
  grade: { type: String, enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'], default: 'C' },
  remarks: { type: String, trim: true },
}, { timestamps: true });

// Calculate overall percentage and grade before saving
performanceSchema.pre('save', function(next) {
  this.overallPercentage = (
    (this.attendance * 0.1) +
    (this.assignmentScore * 0.2) +
    (this.quizScore * 0.15) +
    (this.midExamScore * 0.25) +
    (this.finalExamScore * 0.3)
  );

  if (this.overallPercentage >= 90) this.grade = 'A+';
  else if (this.overallPercentage >= 80) this.grade = 'A';
  else if (this.overallPercentage >= 70) this.grade = 'B+';
  else if (this.overallPercentage >= 60) this.grade = 'B';
  else if (this.overallPercentage >= 50) this.grade = 'C+';
  else if (this.overallPercentage >= 40) this.grade = 'C';
  else if (this.overallPercentage >= 33) this.grade = 'D';
  else this.grade = 'F';

  next();
});

module.exports = mongoose.model('Performance', performanceSchema);
