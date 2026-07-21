const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '..', 'server.log');

const logger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const timestamp = new Date().toISOString();

    const logEntry = `[${timestamp}] ${method} ${originalUrl} ${status} ${duration}ms - ${req.ip || req.connection?.remoteAddress || 'unknown'}\n`;

    fs.appendFile(logFile, logEntry, (err) => {
      if (err) console.error('Failed to write access log:', err.message);
    });

    console.log(`${method} ${originalUrl} ${status} ${duration}ms`);
  });

  next();
};

module.exports = logger;
