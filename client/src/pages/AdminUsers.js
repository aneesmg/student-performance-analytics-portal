import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon } from '../components/Icons';
import './RoleDashboards.css';

const AdminUsers = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const [users] = useState([
    { id: 1, name: 'Ayesha Khan', email: 'ayesha@example.com', role: 'student', status: 'Active', created: '2025-09-01' },
    { id: 2, name: 'Bilal Ahmed', email: 'bilal.ahmed@example.com', role: 'teacher', status: 'Active', created: '2024-08-15' },
    { id: 3, name: 'Hassan Ali', email: 'hassan@example.com', role: 'student', status: 'Inactive', created: '2025-09-03' },
    { id: 4, name: 'Fatima Hussain', email: 'fatima@example.com', role: 'student', status: 'Active', created: '2025-09-05' },
    { id: 5, name: 'Sana Malik', email: 'sana.malik@example.com', role: 'teacher', status: 'Active', created: '2024-06-20' },
    { id: 6, name: 'Usman Sheikh', email: 'usman@example.com', role: 'student', status: 'Active', created: '2025-08-28' },
    { id: 7, name: 'Fatima Siddiqui', email: 'fatima.siddiqui@example.com', role: 'admin', status: 'Active', created: '2023-01-10' },
    { id: 8, name: 'Hamza Rizvi', email: 'hamza@example.com', role: 'student', status: 'Inactive', created: '2025-09-10' },
  ]);

  const filtered = users.filter((u) => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter && u.role !== roleFilter) return false;
    return true;
  });

  return (
    <DashboardLayout title="Manage Users" subtitle="Create, edit, and manage all system users">
      <div className="card-controls-bar">
        <div className="search-input-wrapper">
          <SearchIcon size={16} color="#9e9e9e" />
          <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="filter-select-sm">
          <option value="">All Roles</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-primary btn-sm">
          <PlusIcon size={16} color="#fff" /> Add User
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>System Users</h3>
          <span className="card-badge">{filtered.length} users</span>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td className="cell-primary">{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className={`role-badge role-${u.role}`}>{u.role}</span></td>
                  <td>
                    <span className={`status-indicator ${u.status === 'Active' ? 'active' : 'inactive'}`}>
                      <span className="status-dot" />{u.status}
                    </span>
                  </td>
                  <td className="cell-muted">{u.created}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Edit"><EditIcon size={15} color="#1565c0" /></button>
                      <button className="btn-icon" title="Delete"><TrashIcon size={15} color="#c62828" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="6" className="empty-cell">No users found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
