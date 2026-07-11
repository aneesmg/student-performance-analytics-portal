import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { studentAPI, performanceAPI } from '../services/api';
import { PerformanceCard } from '../components/PerformanceCard';
import { TrendingUpIcon, AlertCircleIcon, BookOpenIcon, AttendanceIcon, GradeIcon } from '../components/Icons';
import './RoleDashboards.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const perfRes = await performanceAPI.getByStudent(user?.id).catch(() => null);
        if (perfRes?.data) {
          const data = Array.isArray(perfRes.data) ? perfRes.data : [perfRes.data];
          setRecords(data);
          const scores = data.map((p) => p.overallPercentage || p.totalScore || p.score || 0);
          const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
          setStats({
            gpa: (avg / 25).toFixed(1),
            attendance: Math.round(data.reduce((s, p) => s + (p.attendance || 0), 0) / data.length),
            courses: data.length,
            due: Math.max(0, 3 - data.length),
          });
        }
      } catch {
        // use mock
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const defaultStats = { gpa: '3.6', attendance: 92, courses: 6, due: 2 };
  const s = stats || defaultStats;

  const statCards = [
    { label: 'Current GPA', value: s.gpa?.toString() || '3.6', icon: GradeIcon, color: '#2e7d32', change: '+0.2' },
    { label: 'Attendance', value: `${s.attendance || 92}%`, icon: AttendanceIcon, color: '#1565c0', change: '+3%' },
    { label: 'Courses Enrolled', value: `${s.courses || 6}`, icon: BookOpenIcon, color: '#6a1b9a', change: 'Current' },
    { label: 'Assignments Due', value: `${s.due || 2}`, icon: AlertCircleIcon, color: '#e65100', change: 'This week' },
  ];

  const recentGrades = records.length > 0 ? records : [
    { course: 'Data Structures', score: 88, grade: 'A', attendance: 92, semester: 3 },
    { course: 'Algorithms', score: 76, grade: 'B+', attendance: 85, semester: 3 },
    { course: 'Database Systems', score: 94, grade: 'A+', attendance: 96, semester: 3 },
    { course: 'Computer Networks', score: 72, grade: 'B', attendance: 78, semester: 3 },
    { course: 'Operating Systems', score: 82, grade: 'A-', attendance: 88, semester: 3 },
  ];

  if (loading) return <DashboardLayout title="Dashboard"><div className="dashboard-loading" /></DashboardLayout>;

  return (
    <DashboardLayout title={`Welcome, ${user?.name?.split(' ')[0] || 'Student'}`} subtitle="Track your academic performance and progress">
      <div className="stats-grid">
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
              <span className="stat-card-change" style={{ color: card.change.startsWith('+') ? '#2e7d32' : '#c62828' }}>{card.change}</span>
            </div>
          );
        })}
      </div>

      <div className="dashboard-grid-2col">
        <div className="card">
          <div className="card-header">
            <h3>Recent Grades</h3>
            <span className="card-badge">{recentGrades.length} courses</span>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {recentGrades.map((r, i) => (
                  <tr key={i}>
                    <td className="cell-primary">{r.course || r.courseName || 'General'}</td>
                    <td><span className="score-value">{r.score || r.overallPercentage || 0}%</span></td>
                    <td><span className={`grade-badge grade-${(r.grade || 'N')[0]?.toLowerCase() || 'n'}`}>{r.grade}</span></td>
                    <td>{r.attendance || 0}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Performance Overview</h3>
            <TrendingUpIcon size={18} color="#6b7280" />
          </div>
          <div className="performance-cards">
            {recentGrades.map((r, i) => (
              <PerformanceCard key={i} student={r} compact />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
