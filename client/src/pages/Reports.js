import React, { useState } from 'react';
import './Reports.css';

const Reports = () => {
  const [reportType, setReportType] = useState('class');
  const [students] = useState([
    { id: 'STU001', name: 'Alice Wonderland', attendance: 92, assignment: 88, quiz: 85, mid: 78, final: 90, total: 86.2, grade: 'A' },
    { id: 'STU002', name: 'Bob Smith', attendance: 85, assignment: 72, quiz: 68, mid: 80, final: 76, total: 75.9, grade: 'B+' },
    { id: 'STU003', name: 'Charlie Brown', attendance: 78, assignment: 65, quiz: 70, mid: 72, final: 68, total: 70.1, grade: 'B' },
    { id: 'STU004', name: 'Diana Prince', attendance: 95, assignment: 96, quiz: 92, mid: 90, final: 95, total: 93.5, grade: 'A+' },
    { id: 'STU005', name: 'Eve Adams', attendance: 70, assignment: 60, quiz: 55, mid: 68, final: 62, total: 62.9, grade: 'C+' },
  ]);

  return (
    <div className="reports page">
      <div className="container">
        <div className="reports-header">
          <h1>Performance Report</h1>
          <p>Comprehensive academic performance analysis and grade reports</p>
        </div>

        <div className="reports-controls card">
          <div className="report-filters">
            <div className="filter-group">
              <label>Report Type</label>
              <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <option value="class">Class Report</option>
                <option value="individual">Individual Report</option>
                <option value="course">Course Report</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Course</label>
              <select>
                <option>All Courses</option>
                <option>Computer Science</option>
                <option>Mathematics</option>
                <option>Physics</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Semester</label>
              <select>
                <option>Semester 1</option>
                <option>Semester 2</option>
                <option>Semester 3</option>
                <option>Semester 4</option>
              </select>
            </div>
            <button className="btn btn-primary">Generate Report</button>
          </div>
        </div>

        <div className="report-summary">
          <div className="card summary-card">
            <h3>Class Average</h3>
            <span className="summary-value">77.7%</span>
            <span className="summary-change up">+4.2%</span>
          </div>
          <div className="card summary-card">
            <h3>Highest Score</h3>
            <span className="summary-value">93.5%</span>
            <span className="summary-label">Diana Prince</span>
          </div>
          <div className="card summary-card">
            <h3>Lowest Score</h3>
            <span className="summary-value">62.9%</span>
            <span className="summary-label">Eve Adams</span>
          </div>
          <div className="card summary-card">
            <h3>Pass Rate</h3>
            <span className="summary-value">100%</span>
            <span className="summary-change up">+1.2%</span>
          </div>
        </div>

        <div className="card report-table-card">
          <h3>Detailed Performance Report</h3>
          <div className="table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Attendance</th>
                  <th>Assignment</th>
                  <th>Quiz</th>
                  <th>Mid Exam</th>
                  <th>Final Exam</th>
                  <th>Total %</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={i}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.attendance}%</td>
                    <td>{s.assignment}%</td>
                    <td>{s.quiz}%</td>
                    <td>{s.mid}%</td>
                    <td>{s.final}%</td>
                    <td className="total-cell">{s.total}%</td>
                    <td><span className={`grade-badge grade-${s.grade[0].toLowerCase()}`}>{s.grade}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
