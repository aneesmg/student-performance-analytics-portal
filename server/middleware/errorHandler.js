const fs = require('fs');
const path = require('path');

const errorLogFile = path.join(__dirname, '..', 'server-error.log');

const logError = (err, req) => {
  const timestamp = new Date().toISOString();
  const logEntry = `
[${timestamp}] ERROR: ${err.message}
  Status: ${err.status || 500}
  Route: ${req.method} ${req.originalUrl}
  IP: ${req.ip}
  Stack: ${err.stack}
  ----------------------------------------
`;

  fs.appendFile(errorLogFile, logEntry, (writeErr) => {
    if (writeErr) console.error('Failed to write error log:', writeErr.message);
  });

  console.error(`[${timestamp}] ${err.method || req.method} ${err.originalUrl || req.originalUrl} - ${err.message}`);
};

const errorHandler = (err, req, res, next) => {
  logError(err, req);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `Duplicate value for ${field}. This ${field} already exists.`,
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { errorHandler, AppError, logError };
