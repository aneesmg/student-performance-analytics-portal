import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon, UsersIcon } from '../components/Icons';
import './RoleDashboards.css';

const AdminCourses = () => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');

  const [courses] = useState([
    { code: 'CS201', name: 'Data Structures', dept: 'Computer Science', credits: 4, students: 32, instructor: 'Prof. Hassan', semester: 3 },
    { code: 'CS202', name: 'Algorithms', dept: 'Computer Science', credits: 4, students: 28, instructor: 'Prof. Hassan', semester: 3 },
    { code: 'CS203', name: 'Database Systems', dept: 'Computer Science', credits: 3, students: 35, instructor: 'Dr. Ahmed', semester: 3 },
    { code: 'CS204', name: 'Computer Networks', dept: 'Computer Science', credits: 3, students: 33, instructor: 'Prof. Hassan', semester: 3 },
    { code: 'MA201', name: 'Discrete Mathematics', dept: 'Mathematics', credits: 3, students: 42, instructor: 'Dr. Fatima', semester: 3 },
    { code: 'PH101', name: 'Physics I', dept: 'Physics', credits: 4, students: 55, instructor: 'Prof. Usman', semester: 1 },
    { code: 'CH101', name: 'Chemistry I', dept: 'Chemistry', credits: 3, students: 48, instructor: 'Dr. Khan', semester: 1 },
    { code: 'BI101', name: 'Biology I', dept: 'Biology', credits: 3, students: 38, instructor: 'Prof. Rizvi', semester: 1 },
  ]);

  const departments = [...new Set(courses.map((c) => c.dept))];

  const filtered = courses.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.code.toLowerCase().includes(search.toLowerCase())) return false;
    if (deptFilter && c.dept !== deptFilter) return false;
    return true;
  });

  return (
    <DashboardLayout title="Manage Courses" subtitle="Create, edit, and manage all courses in the system">
      <div className="card-controls-bar">
        <div className="search-input-wrapper">
          <SearchIcon size={16} color="#9e9e9e" />
          <input type="text" placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="filter-select-sm">
          <option value="">All Departments</option>
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <button className="btn btn-primary btn-sm">
          <PlusIcon size={16} color="#fff" /> Add Course
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>All Courses</h3>
          <span className="card-badge">{filtered.length} courses</span>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Course Name</th>
                <th>Department</th>
                <th>Credits</th>
                <th>Students</th>
                <th>Instructor</th>
                <th>Semester</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i}>
                  <td className="cell-code">{c.code}</td>
                  <td className="cell-primary">{c.name}</td>
                  <td>{c.dept}</td>
                  <td>{c.credits}</td>
                  <td>
                    <div className="cell-with-icon">
                      <UsersIcon size={14} color="#6b7280" />
                      <span>{c.students}</span>
                    </div>
                  </td>
                  <td>{c.instructor}</td>
                  <td>{c.semester}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Edit"><EditIcon size={15} color="#1565c0" /></button>
                      <button className="btn-icon" title="Delete"><TrashIcon size={15} color="#c62828" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="8" className="empty-cell">No courses found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminCourses;
