exports.paginateResponse = (data, page, limit, total) => ({
  data,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPrevPage: page > 1,
  },
});

exports.successResponse = (message, data = null, statusCode = 200) => ({
  success: true,
  message,
  data,
  statusCode,
});

exports.calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C+';
  if (percentage >= 40) return 'C';
  if (percentage >= 33) return 'D';
  return 'F';
};

exports.calculateOverall = (attendance, assignment, quiz, mid, final) => {
  return parseFloat(
    (attendance * 0.10 + assignment * 0.20 + quiz * 0.15 + mid * 0.25 + final * 0.30).toFixed(1)
  );
};

exports.sanitizeQuery = (query) => {
  if (typeof query !== 'string') return '';
  return query.replace(/[<>{}()]/g, '').trim();
};
