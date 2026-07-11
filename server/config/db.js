const db = require('./index');

const dbConfig = {
  url: db.MONGODB_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  collections: {
    users: 'users',
    students: 'students',
    performance: 'performances',
    courses: 'courses',
    grades: 'grades',
  },
};

module.exports = dbConfig;
