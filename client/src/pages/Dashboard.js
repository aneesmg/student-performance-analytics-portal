import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { title: 'Total Students', value: '486', change: '+12%', color: '#1a237e' },
    { title: 'Average Score', value: '76.4%', change: '+3.2%', color: '#2e7d32' },
    { title: 'Pass Rate', value: '89%', change: '+1.5%', color: '#00bcd4' },
    { title: 'At Risk', value: '42', change: '-8%', color: '#c62828' },
  ];

  const recentRecords = [
    { id: 'STU001', name: 'Alice Wonderland', course: 'Computer Science', attendance: 92, score: 88, grade: 'A' },
    { id: 'STU002', name: 'Bob Smith', course: 'Mathematics', attendance: 85, score: 76, grade: 'B+' },
    { id: 'STU003', name: 'Charlie Brown', course: 'Physics', attendance: 78, score: 72, grade: 'B' },
    { id: 'STU004', name: 'Diana Prince', course: 'Chemistry', attendance: 95, score: 94, grade: 'A+' },
    { id: 'STU005', name: 'Eve Adams', course: 'Biology', attendance: 70, score: 65, grade: 'C+' },
    { id: 'STU006', name: 'Frank Castle', course: 'Computer Science', attendance: 88, score: 82, grade: 'A-' },
  ];

  return (
    <div className="dashboard page">
      <div className="container">
        <div className="dash-header">
          <h1>Student Dashboard</h1>
          <p>Real-time overview of student performance metrics</p>
        </div>

        <div className="stats-cards">
          {stats.map((s, i) => (
            <div className="dash-stat-card card" key={i}>
              <div className="dash-stat-icon" style={{ background: s.color }}></div>
              <div className="dash-stat-info">
                <span className="dash-stat-label">{s.title}</span>
                <span className="dash-stat-value">{s.value}</span>
              </div>
              <span className={`dash-stat-change ${s.change.startsWith('+') ? 'up' : 'down'}`}>{s.change}</span>
            </div>
          ))}
        </div>

        <div className="dash-grid">
          <div className="card dash-chart-card">
            <h3>Grade Distribution</h3>
            <div className="grade-bars">
              {[
                { grade: 'A+', count: 45, pct: 100 },
                { grade: 'A', count: 78, pct: 90 },
                { grade: 'B+', count: 92, pct: 80 },
                { grade: 'B', count: 110, pct: 70 },
                { grade: 'C+', count: 85, pct: 60 },
                { grade: 'C', count: 52, pct: 40 },
                { grade: 'D', count: 18, pct: 20 },
                { grade: 'F', count: 6, pct: 10 },
              ].map((g, i) => (
                <div className="grade-row" key={i}>
                  <span className="grade-label">{g.grade}</span>
                  <div className="grade-bar-track">
                    <div className="grade-bar-fill" style={{ width: `${g.pct}%` }}></div>
                  </div>
                  <span className="grade-count">{g.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card dash-recent-card">
            <h3>Recent Performance Records</h3>
            <div className="table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Attnd</th>
                    <th>Score</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRecords.map((r, i) => (
                    <tr key={i}>
                      <td>{r.id}</td>
                      <td>{r.name}</td>
                      <td>{r.course}</td>
                      <td>{r.attendance}%</td>
                      <td>{r.score}%</td>
                      <td><span className={`grade-badge grade-${r.grade[0].toLowerCase()}`}>{r.grade}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
