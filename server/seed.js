const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Student = require('./models/Student');
const Performance = require('./models/Performance');
const Course = require('./models/Course');

const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Engineering'];
const courseNames = {
  'Computer Science': ['Data Structures', 'Algorithms', 'Database Systems', 'Operating Systems', 'Networks', 'AI', 'Web Development', 'Software Engineering'],
  'Mathematics': ['Calculus I', 'Calculus II', 'Linear Algebra', 'Statistics', 'Discrete Math', 'Numerical Methods'],
  'Physics': ['Mechanics', 'Electromagnetism', 'Quantum Physics', 'Thermodynamics', 'Optics'],
  'Chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
  'Biology': ['Cell Biology', 'Genetics', 'Ecology', 'Microbiology', 'Molecular Biology'],
  'Engineering': ['Circuit Analysis', 'Thermodynamics', 'Fluid Mechanics', 'Materials Science', 'Control Systems'],
};

const firstNames = ['Ahmed', 'Muhammad', 'Ali', 'Fatima', 'Ayesha', 'Hassan', 'Husain', 'Zainab', 'Omar', 'Khadija',
  'Bilal', 'Sana', 'Usman', 'Noor', 'Tariq', 'Amna', 'Farhan', 'Rabia', 'Kamran', 'Sadia',
  'Imran', 'Saima', 'Junaid', 'Tabassum', 'Nabeel', 'Shazia', 'Faisal', 'Ghazala', 'Zubair', 'Nadia',
  'Waqar', 'Parveen', 'Adil', 'Shahida', 'Rashid', 'Yasmin', 'Tahir', 'Nasreen', 'Asif', 'Kishwar',
  'Javed', 'Anila', 'Sohail', 'Shaista', 'Nadeem', 'Farzana', 'Iqbal', 'Ruqayya', 'Akram', 'Shamim'];

const lastNames = ['Khan', 'Ahmed', 'Ali', 'Hussain', 'Sheikh', 'Malik', 'Siddiqui', 'Iqbal',
  'Butt', 'Chaudhry', 'Qureshi', 'Hashmi', 'Rizvi', 'Syed', 'Baig', 'Mirza',
  'Usmani', 'Raja', 'Arain', 'Leghari', 'Khattak', 'Durrani', 'Gill', 'Jatoi',
  'Memon', 'Pirzada', 'Shah', 'Gujjar', 'Rana', 'Ansari'];

const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];

const generateStudentId = (index) => `STU${String(2026000 + index).padStart(4, '0')}`;

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(1));
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const calculateGrade = (pct) => {
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B+';
  if (pct >= 60) return 'B';
  if (pct >= 50) return 'C+';
  if (pct >= 40) return 'C';
  if (pct >= 33) return 'D';
  return 'F';
};

const calculateOverall = (attendance, assignment, quiz, mid, final) => {
  return parseFloat((attendance * 0.10 + assignment * 0.20 + quiz * 0.15 + mid * 0.25 + final * 0.30).toFixed(1));
};

const seedUsers = async () => {
  console.log('Seeding users...');
  const users = [
    { name: 'Admin Ahmed', email: 'admin@spap.com', password: 'admin123', role: 'admin' },
    { name: 'Teacher Fatima', email: 'teacher@spap.com', password: 'teacher123', role: 'teacher' },
    { name: 'Student Ali', email: 'student@spap.com', password: 'student123', role: 'student' },
  ];

  for (const u of users) {
    const exists = await User.findOne({ email: u.email });
    if (!exists) {
      const user = new User(u);
      await user.save();
      console.log(`  Created user: ${u.email} (${u.role})`);
    }
  }
};

const seedCourses = async () => {
  console.log('Seeding courses...');
  let codeIndex = 1;
  const courses = [];

  for (const [dept, names] of Object.entries(courseNames)) {
    for (const name of names) {
      const code = `CS${String(codeIndex).padStart(3, '0')}`;
      courses.push({
        courseCode: code,
        courseName: name,
        credits: randomInt(2, 4),
        department: dept,
        instructor: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
        semester: randomInt(1, 4),
        description: `Comprehensive study of ${name.toLowerCase()} covering fundamental to advanced topics.`,
      });
      codeIndex++;
    }
  }

  for (const c of courses) {
    const exists = await Course.findOne({ courseCode: c.courseCode });
    if (!exists) {
      await Course.create(c);
    }
  }
  console.log(`  Created ${courses.length} courses`);
};

const seedStudents = async (count = 100) => {
  console.log(`Seeding ${count} students...`);

  const existingCount = await Student.countDocuments();
  if (existingCount >= count) {
    console.log(`  Already have ${existingCount} students, skipping.`);
    return;
  }

  const students = [];
  const performances = [];

  for (let i = 1; i <= count; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const dept = randomItem(departments);
    const semester = randomInt(1, 4);
    const year = 2025 + Math.floor((i - 1) / 25);

    const attendance = randomInt(60, 100);
    const assignmentScore = randomFloat(40, 100);
    const quizScore = randomFloat(35, 100);
    const midExamScore = randomFloat(30, 100);
    const finalExamScore = randomFloat(30, 100);
    const overall = calculateOverall(attendance, assignmentScore, quizScore, midExamScore, finalExamScore);
    const grade = calculateGrade(overall);

    students.push({
      studentId: generateStudentId(i),
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@student.edu`,
      dateOfBirth: new Date(randomInt(1998, 2005), randomInt(0, 11), randomInt(1, 28)),
      gender: randomItem(['Male', 'Female']),
      phone: `+1${String(randomInt(2000000000, 9999999999))}`,
      address: `${randomInt(100, 9999)} ${randomItem(['Main', 'Mall', 'Garden', 'Park', 'Lake'])} St, ${randomItem(['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar'])}, Pakistan`,
      course: dept,
      semester,
      enrollmentYear: year,
      guardianName: `${randomItem(firstNames)} ${lastName}`,
      guardianPhone: `+1${String(randomInt(2000000000, 9999999999))}`,
    });
  }

  const insertedStudents = await Student.insertMany(students);
  console.log(`  Created ${insertedStudents.length} students`);

  console.log('  Generating performance records...');
  for (const student of insertedStudents) {
    const attendance = randomInt(60, 100);
    const assignmentScore = randomFloat(40, 100);
    const quizScore = randomFloat(35, 100);
    const midExamScore = randomFloat(30, 100);
    const finalExamScore = randomFloat(30, 100);
    const overall = calculateOverall(attendance, assignmentScore, quizScore, midExamScore, finalExamScore);
    const grade = calculateGrade(overall);

    performances.push({
      student: student._id,
      course: student.course,
      semester: student.semester,
      academicYear: `2025-2026`,
      attendance,
      assignmentScore,
      quizScore,
      midExamScore,
      finalExamScore,
      overallPercentage: overall,
      grade,
      remarks: randomItem(['Excellent performance', 'Good effort', 'Needs improvement', 'Consistent work', 'Shows potential', 'Average performance', 'Outstanding achievement']),
    });
  }

  await Performance.insertMany(performances);
  console.log(`  Created ${performances.length} performance records`);
};

const seedAll = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.\n');

    await seedUsers();
    await seedCourses();
    await seedStudents(100);

    console.log('\nSeed completed successfully!');
    console.log(`  Users: ${await User.countDocuments()}`);
    console.log(`  Courses: ${await Course.countDocuments()}`);
    console.log(`  Students: ${await Student.countDocuments()}`);
    console.log(`  Performances: ${await Performance.countDocuments()}`);
  } catch (err) {
    console.error('Seed failed:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedAll();
