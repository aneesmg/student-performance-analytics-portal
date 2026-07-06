const Performance = require('../models/Performance');
const Student = require('../models/Student');

exports.getPerformanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const performances = await Performance.find({ student: studentId }).populate('student', 'name studentId course semester');
    res.json(performances);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllPerformances = async (req, res) => {
  try {
    const { page = 1, limit = 20, course, semester, grade } = req.query;
    const query = {};
    if (course) query.course = course;
    if (semester) query.semester = parseInt(semester);
    if (grade) query.grade = grade;

    const performances = await Performance.find(query)
      .populate('student', 'name studentId course')
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ overallPercentage: -1 });

    const total = await Performance.countDocuments(query);

    res.json({ performances, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPerformance = async (req, res) => {
  try {
    const performance = new Performance(req.body);
    await performance.save();
    res.status(201).json(performance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!performance) return res.status(404).json({ message: 'Performance record not found' });
    res.json(performance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndDelete(req.params.id);
    if (!performance) return res.status(404).json({ message: 'Performance record not found' });
    res.json({ message: 'Performance record deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPerformanceStats = async (req, res) => {
  try {
    const stats = await Performance.aggregate([
      {
        $group: {
          _id: null,
          avgAttendance: { $avg: '$attendance' },
          avgAssignment: { $avg: '$assignmentScore' },
          avgQuiz: { $avg: '$quizScore' },
          avgMid: { $avg: '$midExamScore' },
          avgFinal: { $avg: '$finalExamScore' },
          avgOverall: { $avg: '$overallPercentage' },
          totalRecords: { $sum: 1 },
        },
      },
    ]);
    res.json(stats[0] || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getGradeDistribution = async (req, res) => {
  try {
    const distribution = await Performance.aggregate([
      { $group: { _id: '$grade', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(distribution);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
