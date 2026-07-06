import React from 'react';
import './PerformanceCard.css';

const PerformanceCard = ({ student, compact }) => {
  const getGradeColor = (grade) => {
    if (!grade) return 'pc-grade-n';
    const g = grade[0].toLowerCase();
    if (g === 'a') return 'pc-grade-a';
    if (g === 'b') return 'pc-grade-b';
    if (g === 'c') return 'pc-grade-c';
    if (g === 'd') return 'pc-grade-d';
    if (g === 'f') return 'pc-grade-f';
    return 'pc-grade-n';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#2e7d32';
    if (score >= 60) return '#f9a825';
    return '#c62828';
  };

  const score = student.overallPercentage || student.score || student.totalScore || 0;
  const attendance = student.attendance || 0;

  if (compact) {
    return (
      <div className="pc-card pc-compact">
        <div className="pc-avatar">{student.name?.charAt(0)?.toUpperCase() || '?'}</div>
        <div className="pc-info">
          <span className="pc-name">{student.name}</span>
          <span className="pc-course">{student.course || 'General'}</span>
        </div>
        <div className="pc-metric">
          <span className="pc-score" style={{ color: getScoreColor(score) }}>{score}%</span>
          <span className={`pc-grade ${getGradeColor(student.grade)}`}>{student.grade || 'N/A'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pc-card pc-detailed">
      <div className="pc-header">
        <div className="pc-avatar-lg">{student.name?.charAt(0)?.toUpperCase() || '?'}</div>
        <div className="pc-header-info">
          <h3 className="pc-name-lg">{student.name}</h3>
          <p className="pc-id">{student.studentId || student.id || 'N/A'}</p>
        </div>
        <span className={`pc-grade-lg ${getGradeColor(student.grade)}`}>{student.grade || 'N/A'}</span>
      </div>

      <div className="pc-details">
        <div className="pc-detail-item">
          <span className="pc-detail-label">Course</span>
          <span className="pc-detail-value">{student.course || 'General'}</span>
        </div>
        <div className="pc-detail-item">
          <span className="pc-detail-label">Semester</span>
          <span className="pc-detail-value">{student.semester || 'N/A'}</span>
        </div>
        <div className="pc-detail-item">
          <span className="pc-detail-label">Attendance</span>
          <span className="pc-detail-value">{attendance}%</span>
        </div>
      </div>

      <div className="pc-bars">
        <div className="pc-bar-group">
          <label>Score</label>
          <div className="pc-bar-track">
            <div className="pc-bar-fill" style={{ width: `${score}%`, background: getScoreColor(score) }}></div>
          </div>
          <span className="pc-bar-value">{score}%</span>
        </div>
        <div className="pc-bar-group">
          <label>Attendance</label>
          <div className="pc-bar-track">
            <div className="pc-bar-fill pc-bar-attendance" style={{ width: `${attendance}%` }}></div>
          </div>
          <span className="pc-bar-value">{attendance}%</span>
        </div>
      </div>

      <div className="pc-footer">
        <div className="pc-tags">
          {student.grade && <span className={`pc-tag ${getGradeColor(student.grade)}`}>{student.grade}</span>}
          {score >= 80 && <span className="pc-tag pc-tag-high">High Performer</span>}
          {score < 60 && <span className="pc-tag pc-tag-low">Needs Improvement</span>}
        </div>
      </div>
    </div>
  );
};

export { PerformanceCard };
export default PerformanceCard;
