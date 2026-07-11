import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { GradeIcon, SearchIcon } from '../components/Icons';
import './RoleDashboards.css';

const StudentGrades = () => {
  const [semester, setSemester] = useState('all');
  const [search, setSearch] = useState('');

  const allGrades = [
    { course: 'Data Structures', code: 'CS201', credits: 4, score: 88, grade: 'A', semester: 3, type: 'Theory' },
    { course: 'Algorithms', code: 'CS202', credits: 4, score: 76, grade: 'B+', semester: 3, type: 'Theory' },
    { course: 'Database Systems', code: 'CS203', credits: 3, score: 94, grade: 'A+', semester: 3, type: 'Theory+LAb' },
    { course: 'Computer Networks', code: 'CS204', credits: 3, score: 72, grade: 'B', semester: 3, type: 'Theory' },
    { course: 'Operating Systems', code: 'CS205', credits: 4, score: 82, grade: 'A-', semester: 3, type: 'Theory' },
    { course: 'Discrete Mathematics', code: 'MA201', credits: 3, score: 78, grade: 'B+', semester: 2, type: 'Theory' },
    { course: 'Linear Algebra', code: 'MA102', credits: 3, score: 85, grade: 'A', semester: 2, type: 'Theory' },
    { course: 'Programming Fundamentals', code: 'CS101', credits: 4, score: 91, grade: 'A+', semester: 1, type: 'Theory+LAb' },
    { course: 'Calculus I', code: 'MA101', credits: 3, score: 68, grade: 'C+', semester: 1, type: 'Theory' },
    { course: 'English Composition', code: 'EN101', credits: 2, score: 86, grade: 'A', semester: 1, type: 'Language' },
  ];

  const filtered = allGrades.filter((g) => {
    if (semester !== 'all' && g.semester !== parseInt(semester)) return false;
    if (search && !g.course.toLowerCase().includes(search.toLowerCase()) && !g.code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const gpa = (grades) => {
    const points = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'D': 1.0, 'F': 0 };
    const total = grades.reduce((s, g) => s + (points[g.grade] || 0) * g.credits, 0);
    const credits = grades.reduce((s, g) => s + g.credits, 0);
    return credits > 0 ? (total / credits).toFixed(2) : '0.00';
  };

  const currentGpa = gpa(filtered);
  const totalCredits = filtered.reduce((s, g) => s + g.credits, 0);

  return (
    <DashboardLayout title="My Grades" subtitle="View your academic performance across all courses">
      <div className="stats-grid mini">
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#2e7d3215' }}><GradeIcon size={22} color="#2e7d32" /></div>
          <div className="stat-card-content">
            <span className="stat-card-value">{currentGpa}</span>
            <span className="stat-card-label">GPA</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#1565c015' }}><GradeIcon size={22} color="#1565c0" /></div>
          <div className="stat-card-content">
            <span className="stat-card-value">{totalCredits}</span>
            <span className="stat-card-label">Total Credits</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#6a1b9a15' }}><GradeIcon size={22} color="#6a1b9a" /></div>
          <div className="stat-card-content">
            <span className="stat-card-value">{filtered.length}</span>
            <span className="stat-card-label">Courses</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#e6510015' }}><GradeIcon size={22} color="#e65100" /></div>
          <div className="stat-card-content">
            <span className="stat-card-value">{allGrades.filter(g => (g.grade || 'F')[0] === 'A').length}</span>
            <span className="stat-card-label">A Grades</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Grade Records</h3>
          <div className="card-controls">
            <div className="search-input-wrapper">
              <SearchIcon size={16} color="#9e9e9e" />
              <input type="text" placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select value={semester} onChange={(e) => setSemester(e.target.value)} className="filter-select-sm">
              <option value="all">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
            </select>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Code</th>
                <th>Credits</th>
                <th>Type</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Semester</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((g, i) => (
                <tr key={i}>
                  <td className="cell-primary">{g.course}</td>
                  <td className="cell-code">{g.code}</td>
                  <td>{g.credits}</td>
                  <td>{g.type}</td>
                  <td><span className="score-value">{g.score}%</span></td>
                  <td><span className={`grade-badge grade-${(g.grade || 'N')[0]?.toLowerCase() || 'n'}`}>{g.grade}</span></td>
                  <td>{g.semester}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="7" className="empty-cell">No grades match your filters</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentGrades;
