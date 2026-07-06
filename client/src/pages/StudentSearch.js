import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './StudentSearch.css';

const initialStudents = [
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
  { id: 'STU011', name: 'Khadija Butt', course: 'Chemistry', semester: 4, attendance: 91, score: 90, grade: 'A', email: 'khadija@example.com' },
  { id: 'STU012', name: 'Muhammad Ali', course: 'Mathematics', semester: 1, attendance: 82, score: 78, grade: 'B+', email: 'm.ali@example.com' },
];

const StudentSearch = () => {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  const courses = useMemo(() => [...new Set(initialStudents.map((s) => s.course))], []);

  const filtered = useMemo(() => {
    let result = [...initialStudents];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q)
      );
    }

    if (courseFilter) {
      result = result.filter((s) => s.course === courseFilter);
    }

    result.sort((a, b) => {
      let cmp = 0;
      switch (sortBy) {
        case 'name': cmp = a.name.localeCompare(b.name); break;
        case 'id': cmp = a.id.localeCompare(b.id); break;
        case 'score': cmp = a.score - b.score; break;
        case 'attendance': cmp = a.attendance - b.attendance; break;
        case 'grade': cmp = (a.grade || '').localeCompare(b.grade || ''); break;
        case 'semester': cmp = a.semester - b.semester; break;
        default: cmp = 0;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [search, courseFilter, sortBy, sortDir]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDir('asc');
    }
  };

  const getGradeColor = (grade) => {
    if (!grade) return 'grade-n';
    const g = grade[0].toLowerCase();
    if (g === 'a') return 'grade-a';
    if (g === 'b') return 'grade-b';
    if (g === 'c') return 'grade-c';
    if (g === 'd') return 'grade-d';
    if (g === 'f') return 'grade-f';
    return 'grade-n';
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return <span className="sort-icon">&#8597;</span>;
    return <span className="sort-icon active">{sortDir === 'asc' ? '&#8593;' : '&#8595;'}</span>;
  };

  return (
    <div className="search-page page">
      <div className="container">
        <div className="search-header">
          <h1>Student Directory</h1>
          <p>Search, filter, and sort through student records</p>
        </div>

        <div className="card search-controls">
          <div className="search-bar">
            <span className="search-icon">&#128269;</span>
            <input
              type="text"
              placeholder="Search by name, ID, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && <button className="search-clear" onClick={() => setSearch('')}>&times;</button>}
          </div>
          <div className="search-filters">
            <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className="filter-select">
              <option value="">All Courses</option>
              {courses.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="result-count">{filtered.length} student{filtered.length !== 1 ? 's' : ''} found</span>
          </div>
        </div>

        <div className="card search-results-card">
          <div className="table-wrapper">
            <table className="search-table">
              <thead>
                <tr>
                  <th onClick={() => toggleSort('id')} className="sortable">ID <SortIcon field="id" /></th>
                  <th onClick={() => toggleSort('name')} className="sortable">Name <SortIcon field="name" /></th>
                  <th>Course</th>
                  <th onClick={() => toggleSort('semester')} className="sortable">Sem <SortIcon field="semester" /></th>
                  <th onClick={() => toggleSort('attendance')} className="sortable">Attnd <SortIcon field="attendance" /></th>
                  <th onClick={() => toggleSort('score')} className="sortable">Score <SortIcon field="score" /></th>
                  <th onClick={() => toggleSort('grade')} className="sortable">Grade <SortIcon field="grade" /></th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="8" className="empty-state">No students match your search criteria</td></tr>
                ) : (
                  filtered.map((s, i) => (
                    <tr key={i} className="search-row" style={{ animationDelay: `${i * 0.03}s` }}>
                      <td className="cell-id">{s.id}</td>
                      <td className="cell-name">{s.name}</td>
                      <td>{s.course}</td>
                      <td>{s.semester}</td>
                      <td>{s.attendance}%</td>
                      <td><span className="score-value">{s.score}%</span></td>
                      <td><span className={`grade-badge ${getGradeColor(s.grade)}`}>{s.grade}</span></td>
                      <td>
                        <Link to={`/profile/${s.id}`} className="btn btn-sm btn-outline">View</Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSearch;
