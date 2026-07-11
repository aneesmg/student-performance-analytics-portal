const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Student = require('./models/Student');
const Course = require('./models/Course');
const Performance = require('./models/Performance');

const seed = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Student.deleteMany({});
    await Course.deleteMany({});
    await Performance.deleteMany({});
    console.log('Cleared existing data');

    const admin = await User.create({ name: 'Admin User', email: 'admin@spap.com', password: 'admin123', role: 'admin' });
    const teacher = await User.create({ name: 'Teacher User', email: 'teacher@spap.com', password: 'teacher123', role: 'teacher' });
    const studentUser = await User.create({ name: 'Student User', email: 'student@spap.com', password: 'student123', role: 'student' });
    console.log('Users created');

    const student = await Student.create({
      studentId: 'STU001',
      name: 'Student User',
      email: 'student@spap.com',
      course: 'Computer Science',
      semester: 3,
      enrollmentYear: 2025,
      gender: 'Male',
      phone: '+1-555-0100',
    });
    console.log('Student profile created');

    const courses = await Course.create([
      { courseCode: 'CS201', courseName: 'Data Structures', credits: 4, department: 'Computer Science', instructor: 'Teacher User', semester: 3 },
      { courseCode: 'CS202', courseName: 'Algorithms', credits: 4, department: 'Computer Science', instructor: 'Teacher User', semester: 3 },
      { courseCode: 'CS203', courseName: 'Database Systems', credits: 3, department: 'Computer Science', instructor: 'Teacher User', semester: 3 },
      { courseCode: 'CS204', courseName: 'Computer Networks', credits: 3, department: 'Computer Science', instructor: 'Teacher User', semester: 3 },
      { courseCode: 'CS205', courseName: 'Operating Systems', credits: 4, department: 'Computer Science', instructor: 'Teacher User', semester: 3 },
    ]);
    console.log('Courses created');

    const performanceData = [
      { student: student._id, course: 'Data Structures', semester: 3, academicYear: '2025', attendance: 92, assignmentScore: 85, quizScore: 88, midExamScore: 80, finalExamScore: 90 },
      { student: student._id, course: 'Algorithms', semester: 3, academicYear: '2025', attendance: 85, assignmentScore: 72, quizScore: 75, midExamScore: 78, finalExamScore: 76 },
      { student: student._id, course: 'Database Systems', semester: 3, academicYear: '2025', attendance: 96, assignmentScore: 90, quizScore: 92, midExamScore: 94, finalExamScore: 95 },
      { student: student._id, course: 'Computer Networks', semester: 3, academicYear: '2025', attendance: 78, assignmentScore: 70, quizScore: 72, midExamScore: 68, finalExamScore: 74 },
      { student: student._id, course: 'Operating Systems', semester: 3, academicYear: '2025', attendance: 88, assignmentScore: 80, quizScore: 82, midExamScore: 84, finalExamScore: 85 },
    ];
    await Performance.create(performanceData);
    console.log('Performance records created');

    console.log('\nSeed complete! Default accounts:');
    console.log('  Admin:   admin@spap.com / admin123');
    console.log('  Teacher: teacher@spap.com / teacher123');
    console.log('  Student: student@spap.com / student123');

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
