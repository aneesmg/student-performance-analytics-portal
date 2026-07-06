import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { SearchIcon, GradeIcon, AttendanceIcon } from '../components/Icons';
import './RoleDashboards.css';

const TeacherStudents = () => {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  const students = [
    { id: 'STU001', name: 'Ayesha Khan', course: 'Computer Science', semester: 3, attendance: 92, score: 88, grade: 'A', email: 'ayesha@example.com' },
    { id: 'STU002', name: 'Bilal Ahmed', course: 'Mathematics', semester: 2, attendance: 85, score: 76, grade: 'B+', email: 'bilal@example.com' },
    { id: 'STU003', name: 'Hassan Ali', course: 'Physics', semester: 4, attendance: 78, score: 72, grade: 'B', email: 'hassan@example.com' },
    { id: 'STU004', name: 'Fatima Hussain', course: 'Chemistry', semester: 2, attendance: 95, score: 94, grade: 'A+', email: 'fatima@example.com' },
    { id: 'STU005', name: 'Sana Malik', course: 'Biology', semester: 1, attendance: 70, score: 65, grade: 'C+', email: 'sana@example.com' },
    { id: 'STU006', name: 'Usman Sheikh', course: 'Computer Science', semester: 3, attendance: 88, score: 82, grade: 'A-', email: 'usman@example.com' },
    { id: 'STU007', name: 'Fatima Siddiqui', course: 'Mathematics', semester: 4, attendance: 96, score: 97, grade: 'A+', email: 'fatima.siddiqui@example.com' },
    { id: 'STU008', name: 'Hamza Rizvi', course: 'Physics', semester: 1, attendance: 65, score: 58, grade: 'D+', email: 'hamza@example.com' },
    { id: 'STU009', name: 'Zainab Shah', course: 'Computer Science', semester: 2, attendance: 90, score: 85, grade: 'A', email: 'zainab@example.com' },
    { id: 'STU010', name: 'Junaid Iqbal', course: 'Biology', semester: 3, attendance: 72, score: 68, grade: 'C', email: 'junaid@example.com' },
  ];

  const courses = [...new Set(students.map((s) => s.course))];

  const toggleSort = (field) => {
    if (sortBy === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortBy(field); setSortDir('asc'); }
  };

  const filtered = students
    .filter((s) => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.id.toLowerCase().includes(search.toLowerCase())) return false;
      if (courseFilter && s.course !== courseFilter) return false;
      return true;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortBy === 'score') cmp = a.score - b.score;
      else if (sortBy === 'attendance') cmp = a.attendance - b.attendance;
      else if (sortBy === 'grade') cmp = (a.grade || '').localeCompare(b.grade || '');
      else if (sortBy === 'semester') cmp = a.semester - b.semester;
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const SortHeader = ({ field, label }) => (
    <th className="sortable-th" onClick={() => toggleSort(field)}>
      {label} {sortBy === field ? (sortDir === 'asc' ? '\u2191' : '\u2193') : '\u2195'}
    </th>
  );

  return (
    <DashboardLayout title="My Students" subtitle="View and manage all students across your courses">
      <div className="card">
        <div className="card-header">
          <div className="card-controls wide">
            <div className="search-input-wrapper">
              <SearchIcon size={16} color="#9e9e9e" />
              <input type="text" placeholder="Search by name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className="filter-select-sm">
              <option value="">All Courses</option>
              {courses.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="result-count">{filtered.length} students</span>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <SortHeader field="id" label="ID" />
                <SortHeader field="name" label="Name" />
                <th>Course</th>
                <SortHeader field="semester" label="Sem" />
                <SortHeader field="attendance" label="Attendance" />
                <SortHeader field="score" label="Score" />
                <SortHeader field="grade" label="Grade" />
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={i}>
                  <td className="cell-code">{s.id}</td>
                  <td className="cell-primary">{s.name}</td>
                  <td>{s.course}</td>
                  <td>{s.semester}</td>
                  <td>
                    <div className="progress-bar-cell">
                      <div className="progress-bar-sm">
                        <div className="progress-bar-fill" style={{ width: `${s.attendance}%`, background: s.attendance >= 80 ? '#2e7d32' : '#e65100' }} />
                      </div>
                      <span>{s.attendance}%</span>
                    </div>
                  </td>
                  <td><span className="score-value">{s.score}%</span></td>
                  <td><span className={`grade-badge grade-${(s.grade || 'N')[0]?.toLowerCase() || 'n'}`}>{s.grade}</span></td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Edit grades"><GradeIcon size={15} color="#1565c0" /></button>
                      <button className="btn-icon" title="View attendance"><AttendanceIcon size={15} color="#2e7d32" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="8" className="empty-cell">No students found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherStudents;
