import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import {
  UsersIcon, BookOpenIcon, GradeIcon, TrendingUpIcon,
  CheckCircleIcon, AlertCircleIcon, BellIcon, PlusIcon
} from '../components/Icons';
import './StyleGuide.css';

const DarkModeDemo = () => {
  return (
    <DashboardLayout title="Dark Mode Preview" subtitle="Visual reference for all components in current theme">
      <div style={{ maxWidth: 900 }}>

        <div className="stats-grid" style={{ marginBottom: 28 }}>
          <div className="stat-card">
            <div className="stat-card-icon" style={{ background: '#2e7d3215' }}>
              <UsersIcon size={22} color="#2e7d32" />
            </div>
            <div className="stat-card-content">
              <span className="stat-card-value">1,247</span>
              <span className="stat-card-label">Total Users</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon" style={{ background: '#1565c015' }}>
              <BookOpenIcon size={22} color="#1565c0" />
            </div>
            <div className="stat-card-content">
              <span className="stat-card-value">24</span>
              <span className="stat-card-label">Courses</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon" style={{ background: '#6a1b9a15' }}>
              <GradeIcon size={22} color="#6a1b9a" />
            </div>
            <div className="stat-card-content">
              <span className="stat-card-value">76.4%</span>
              <span className="stat-card-label">Avg Score</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon" style={{ background: '#e6510015' }}>
              <TrendingUpIcon size={22} color="#e65100" />
            </div>
            <div className="stat-card-content">
              <span className="stat-card-value">89%</span>
              <span className="stat-card-label">Pass Rate</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid-2col">
          <div className="card">
            <div className="card-header">
              <h3>Data Table Example</h3>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Grade</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="cell-primary">Ayesha Khan</td>
                    <td>ayesha@example.com</td>
                    <td><span className="grade-badge grade-a">A</span></td>
                    <td><span className="status-indicator active"><span className="status-dot active" />Active</span></td>
                  </tr>
                  <tr>
                    <td className="cell-primary">Bilal Ahmed</td>
                    <td>bilal@example.com</td>
                    <td><span className="grade-badge grade-b">B+</span></td>
                    <td><span className="status-indicator active"><span className="status-dot active" />Active</span></td>
                  </tr>
                  <tr>
                    <td className="cell-primary">Sana Malik</td>
                    <td>sana@example.com</td>
                    <td><span className="grade-badge grade-c">C</span></td>
                    <td><span className="status-indicator inactive"><span className="status-dot inactive" />Inactive</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Activity Feed</h3>
            </div>
            <div className="activity-feed">
              <div className="activity-item">
                <span className="activity-dot" style={{ background: 'var(--success)' }} />
                <div className="activity-content">
                  <span className="activity-action">Grade posted</span>
                  <span className="activity-detail">Mathematics - Final Exam</span>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-dot" style={{ background: 'var(--warning)' }} />
                <div className="activity-content">
                  <span className="activity-action">Attendance alert</span>
                  <span className="activity-detail">Missed Physics class</span>
                  <span className="activity-time">1 day ago</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-dot" style={{ background: 'var(--primary)' }} />
                <div className="activity-content">
                  <span className="activity-action">Course registered</span>
                  <span className="activity-detail">Artificial Intelligence</span>
                  <span className="activity-time">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Button Variants</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-accent">Accent</button>
            <button className="btn btn-outline">Outline</button>
            <button className="btn btn-danger">Danger</button>
            <button className="btn btn-primary btn-sm">Small</button>
            <button className="btn btn-primary"><PlusIcon size={16} /> With Icon</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Alert Variants</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="sg-alert success">
              <CheckCircleIcon size={18} />
              <span>Success alert</span>
            </div>
            <div className="sg-alert error">
              <AlertCircleIcon size={18} />
              <span>Error alert</span>
            </div>
            <div className="sg-alert warning">
              <AlertCircleIcon size={18} />
              <span>Warning alert</span>
            </div>
            <div className="sg-alert info">
              <BellIcon size={18} />
              <span>Info alert</span>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DarkModeDemo;
