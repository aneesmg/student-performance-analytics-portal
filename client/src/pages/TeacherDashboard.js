import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { UsersIcon, GradeIcon, AttendanceIcon, TrendingUpIcon, BookOpenIcon } from '../components/Icons';
import './RoleDashboards.css';

const TeacherDashboard = () => {
  const { user } = useAuth();

  const classStats = [
    { label: 'Total Students', value: '128', icon: UsersIcon, color: '#2e7d32', change: '+4 this sem' },
    { label: 'Class Average', value: '76.4%', icon: GradeIcon, color: '#1565c0', change: '+3.2%' },
    { label: 'Pass Rate', value: '89%', icon: TrendingUpIcon, color: '#6a1b9a', change: '+1.5%' },
    { label: 'Avg Attendance', value: '84%', icon: AttendanceIcon, color: '#e65100', change: '-2%' },
  ];

  const courses = [
    { name: 'Data Structures', code: 'CS201', students: 32, avgScore: 78, avgAtt: 86, schedule: 'Mon/Wed 10:00 AM' },
    { name: 'Algorithms', code: 'CS202', students: 28, avgScore: 72, avgAtt: 82, schedule: 'Tue/Thu 2:00 PM' },
    { name: 'Database Systems', code: 'CS203', students: 35, avgScore: 81, avgAtt: 91, schedule: 'Mon/Wed 2:00 PM' },
    { name: 'Computer Networks', code: 'CS204', students: 33, avgScore: 68, avgAtt: 76, schedule: 'Tue/Thu 10:00 AM' },
  ];

  const recentActivity = [
    { action: 'Submitted grades', detail: 'Data Structures - Midterm Exam', time: '2 hours ago' },
    { action: 'Updated attendance', detail: 'Algorithms - Week 8', time: 'Yesterday' },
    { action: 'Added course material', detail: 'Database Systems - Module 4', time: '2 days ago' },
    { action: 'Posted announcement', detail: 'Computer Networks - Project Update', time: '3 days ago' },
  ];

  return (
    <DashboardLayout title={`Welcome, ${user?.name?.split(' ')[0] || 'Teacher'}`} subtitle="Manage your courses and monitor student performance">
      <div className="stats-grid">
        {classStats.map((card, i) => {
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
              <span className="stat-card-change" style={{ color: card.change.startsWith('+') ? '#2e7d32' : '#c62828' }}>{card.change}</span>
            </div>
          );
        })}
      </div>

      <div className="dashboard-grid-2col">
        <div className="card">
          <div className="card-header">
            <h3>My Courses</h3>
            <BookOpenIcon size={18} color="#6b7280" />
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Code</th>
                  <th>Students</th>
                  <th>Avg Score</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c, i) => (
                  <tr key={i}>
                    <td className="cell-primary">{c.name}</td>
                    <td className="cell-code">{c.code}</td>
                    <td>{c.students}</td>
                    <td><span className="score-value">{c.avgScore}%</span></td>
                    <td>
                      <div className="progress-bar-cell">
                        <div className="progress-bar-sm">
                          <div className="progress-bar-fill" style={{ width: `${c.avgAtt}%`, background: c.avgAtt >= 80 ? '#2e7d32' : '#e65100' }} />
                        </div>
                        <span>{c.avgAtt}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Recent Activity</h3>
            <span className="card-badge">Today</span>
          </div>
          <div className="activity-feed">
            {recentActivity.map((a, i) => (
              <div className="activity-item" key={i}>
                <div className="activity-dot" />
                <div className="activity-content">
                  <p className="activity-action">{a.action}</p>
                  <p className="activity-detail">{a.detail}</p>
                  <span className="activity-time">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
