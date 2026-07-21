const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const logger = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(logger);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/performance', require('./routes/performance'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/courses', require('./routes/courses'));

app.get('/', (req, res) => {
  res.json({
    name: 'Student Performance Analytics Portal API',
    version: '3.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/auth (register, login, me, profile)',
      students: '/api/students (CRUD, search, filter, pagination)',
      performance: '/api/performance (records, stats, grade-distribution, filter-options)',
      courses: '/api/courses (CRUD, departments, search, pagination)',
      reports: '/api/reports (summary, grades, compare, export/csv, export/pdf)',
    },
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.use('/api/reports/download', express.static(path.join(__dirname, 'exports')));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
