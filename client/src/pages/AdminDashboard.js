import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { studentAPI, performanceAPI } from '../services/api';
import { UsersIcon, BookOpenIcon, GradeIcon, TrendingUpIcon, SchoolIcon, BarChartIcon } from '../components/Icons';
import './RoleDashboards.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [perfStats, studentsRes] = await Promise.all([
          performanceAPI.getStats().catch(() => null),
          studentAPI.getAll({ limit: 5 }).catch(() => null),
        ]);
        if (perfStats) setStats(perfStats);
        if (studentsRes?.data?.students) {
          setRecentUsers(studentsRes.data.students.map((s) => ({
            name: s.name, email: s.email, role: 'student', status: 'Active', date: s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'Today',
          })));
        }
      } catch {
        // Use mock data
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = stats ? [
    { label: 'Avg Score', value: `${(stats.avgOverall || 0).toFixed(1)}%`, icon: GradeIcon, color: '#e65100', change: '+3.2%' },
    { label: 'Avg Attendance', value: `${(stats.avgAttendance || 0).toFixed(1)}%`, icon: TrendingUpIcon, color: '#2e7d32', change: '+1.5%' },
    { label: 'Total Records', value: `${stats.totalRecords || 0}`, icon: BarChartIcon, color: '#6a1b9a', change: 'All time' },
    { label: 'Students', value: `${stats.totalStudents || 0}`, icon: SchoolIcon, color: '#1565c0', change: 'Active' },
  ] : [
    { label: 'Total Users', value: '1,247', icon: UsersIcon, color: '#2e7d32', change: '+28 this month' },
    { label: 'Total Students', value: '486', icon: SchoolIcon, color: '#1565c0', change: '+12' },
    { label: 'Active Courses', value: '24', icon: BookOpenIcon, color: '#6a1b9a', change: 'This semester' },
    { label: 'Avg Score', value: '76.4%', icon: GradeIcon, color: '#e65100', change: '+3.2%' },
    { label: 'Pass Rate', value: '89%', icon: TrendingUpIcon, color: '#2e7d32', change: '+1.5%' },
    { label: 'Teachers', value: '18', icon: UsersIcon, color: '#00838f', change: '2 new' },
  ];

  const displayUsers = recentUsers.length > 0 ? recentUsers : [
    { name: 'Ayesha Khan', email: 'ayesha@example.com', role: 'student', status: 'Active', date: 'Today' },
    { name: 'Bilal Ahmed', email: 'bilal.ahmed@example.com', role: 'teacher', status: 'Active', date: 'Yesterday' },
    { name: 'Hassan Ali', email: 'hassan@example.com', role: 'student', status: 'Inactive', date: '2 days ago' },
    { name: 'Fatima Hussain', email: 'fatima@example.com', role: 'student', status: 'Active', date: '3 days ago' },
    { name: 'Sana Malik', email: 'sana.malik@example.com', role: 'teacher', status: 'Active', date: '5 days ago' },
  ];

  return (
    <DashboardLayout title="Admin Dashboard" subtitle="System-wide overview and management">
      <div className="stats-grid wide">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div className="stat-card" key={i}>
              <div className="stat-card-icon" style={{ background: `${card.color}15` }}>
                <Icon size={22} color={card.color} />
              </div>
              <div className="stat-card-content">
                <span className="stat-card-value">{card.value}</span>
                <span className="stat-card-label">{card.label}</span>
              </div>
              <span className="stat-card-change" style={{ color: '#6b7280', fontSize: 11 }}>{card.change}</span>
            </div>
          );
        })}
      </div>

      <div className="dashboard-grid-2col">
        <div className="card">
          <div className="card-header">
            <h3>Recent Registrations</h3>
            <UsersIcon size={18} color="#6b7280" />
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {displayUsers.map((u, i) => (
                  <tr key={i}>
                    <td className="cell-primary">{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className={`role-badge role-${u.role}`}>{u.role}</span></td>
                    <td><span className={`status-dot ${u.status === 'Active' ? 'active' : 'inactive'}`} />{u.status}</td>
                    <td className="cell-muted">{u.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>System Overview</h3>
            <BarChartIcon size={18} color="#6b7280" />
          </div>
          <div className="system-metrics">
            <div className="metric-row">
              <span className="metric-label">Storage Used</span>
              <div className="metric-bar-track">
                <div className="metric-bar-fill" style={{ width: '68%', background: '#1565c0' }} />
              </div>
              <span className="metric-value">68%</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">API Requests</span>
              <div className="metric-bar-track">
                <div className="metric-bar-fill" style={{ width: '42%', background: '#2e7d32' }} />
              </div>
              <span className="metric-value">42%</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">User Capacity</span>
              <div className="metric-bar-track">
                <div className="metric-bar-fill" style={{ width: '31%', background: '#6a1b9a' }} />
              </div>
              <span className="metric-value">31%</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">System Health</span>
              <div className="metric-bar-track">
                <div className="metric-bar-fill" style={{ width: '96%', background: '#2e7d32' }} />
              </div>
              <span className="metric-value">96%</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
