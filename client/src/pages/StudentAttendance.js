import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { AttendanceIcon, CheckCircleIcon, AlertCircleIcon, ClockIcon } from '../components/Icons';
import './RoleDashboards.css';

const StudentAttendance = () => {
  const attendanceData = [
    { course: 'Data Structures', total: 30, present: 28, percentage: 93.3, status: 'Good' },
    { course: 'Algorithms', total: 28, present: 24, percentage: 85.7, status: 'Good' },
    { course: 'Database Systems', total: 26, present: 25, percentage: 96.2, status: 'Excellent' },
    { course: 'Computer Networks', total: 24, present: 19, percentage: 79.2, status: 'Warning' },
    { course: 'Operating Systems', total: 28, present: 25, percentage: 89.3, status: 'Good' },
  ];

  const totalPresent = attendanceData.reduce((s, c) => s + c.present, 0);
  const totalClasses = attendanceData.reduce((s, c) => s + c.total, 0);
  const overall = ((totalPresent / totalClasses) * 100).toFixed(1);

  const monthlyData = [
    { month: 'Jan', percent: 88 },
    { month: 'Feb', percent: 92 },
    { month: 'Mar', percent: 85 },
    { month: 'Apr', percent: 91 },
    { month: 'May', percent: 94 },
    { month: 'Jun', percent: 89 },
  ];

  return (
    <DashboardLayout title="My Attendance" subtitle="Track your attendance records across all courses">
      <div className="stats-grid mini">
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#2e7d3215' }}><AttendanceIcon size={22} color="#2e7d32" /></div>
          <div className="stat-card-content">
            <span className="stat-card-value">{overall}%</span>
            <span className="stat-card-label">Overall Attendance</span>
          </div>
          <span className="stat-card-change" style={{ color: '#2e7d32' }}>Good</span>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#1565c015' }}><CheckCircleIcon size={22} color="#1565c0" /></div>
          <div className="stat-card-content">
            <span className="stat-card-value">{totalPresent}</span>
            <span className="stat-card-label">Classes Attended</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#e6510015' }}><ClockIcon size={22} color="#e65100" /></div>
          <div className="stat-card-content">
            <span className="stat-card-value">{totalClasses - totalPresent}</span>
            <span className="stat-card-label">Classes Missed</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#6a1b9a15' }}><AlertCircleIcon size={22} color="#6a1b9a" /></div>
          <div className="stat-card-content">
            <span className="stat-card-value">{attendanceData.filter(c => parseFloat(c.percentage) < 80).length}</span>
            <span className="stat-card-label">At Risk Courses</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid-2col">
        <div className="card">
          <div className="card-header">
            <h3>Course-wise Attendance</h3>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Present</th>
                  <th>Total</th>
                  <th>Percentage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((c, i) => {
                  const statusColor = c.status === 'Excellent' ? '#2e7d32' : c.status === 'Good' ? '#1565c0' : '#e65100';
                  return (
                    <tr key={i}>
                      <td className="cell-primary">{c.course}</td>
                      <td>{c.present}</td>
                      <td>{c.total}</td>
                      <td>
                        <div className="progress-bar-cell">
                          <div className="progress-bar-sm">
                            <div className="progress-bar-fill" style={{ width: `${c.percentage}%`, background: statusColor }} />
                          </div>
                          <span>{c.percentage}%</span>
                        </div>
                      </td>
                      <td><span className="status-badge" style={{ color: statusColor, background: `${statusColor}15` }}>{c.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Monthly Trend</h3>
          </div>
          <div className="monthly-chart">
            {monthlyData.map((m, i) => (
              <div className="month-bar" key={i}>
                <span className="month-bar-value">{m.percent}%</span>
                <div className="month-bar-track">
                  <div className="month-bar-fill" style={{ height: `${m.percent}%`, background: m.percent >= 85 ? '#2e7d32' : '#e65100' }} />
                </div>
                <span className="month-bar-label">{m.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentAttendance;
