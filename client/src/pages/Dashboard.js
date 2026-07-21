import React, { useState, useEffect, useCallback } from 'react';
import { performanceAPI, reportAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { BarChart, PieChart, LineChart } from '../components/Charts';
import NotificationWidget from '../components/NotificationWidget';
import RecentActivity from '../components/RecentActivity';
import ExportOptions from '../components/ExportOptions';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [summary, setSummary] = useState(null);
  const [gradeDist, setGradeDist] = useState([]);
  const [subjectPerf, setSubjectPerf] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('semester');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [statsRes, summaryRes, gradeRes] = await Promise.all([
        performanceAPI.getStats(),
        reportAPI.getSummary(),
        reportAPI.getGradeReport(),
      ]);

      setStats(statsRes.data.data.stats);
      setGradeDist(gradeRes.data.data.distribution || []);

      const s = summaryRes.data.data;
      setSummary(s.summary);
      setSubjectPerf(s.subjectPerformances || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchData}>Retry</button>
      </div>
    );
  }

  const isStudent = user?.role === 'student';

  const adminStatCards = [
    { label: 'Total Students', value: stats?.totalRecords || 0, icon: '👥', color: '#1a237e' },
    { label: 'Average Score', value: `${stats?.averageScore?.toFixed(1) || 0}%`, icon: '📊', color: '#2e7d32' },
    { label: 'Average Attendance', value: `${stats?.averageAttendance?.toFixed(1) || 0}%`, icon: '📋', color: '#00bcd4' },
    { label: 'Pass Rate', value: `${summary?.passRate || 0}%`, icon: '🎯', color: '#f9a825' },
  ];

  const studentStatCards = [
    { label: 'My Courses', value: '4', icon: '📚', color: '#1a237e' },
    { label: 'My Avg Score', value: '78.5%', icon: '📊', color: '#2e7d32' },
    { label: 'My Attendance', value: '85%', icon: '📋', color: '#00bcd4' },
    { label: 'My Rank', value: 'Top 30%', icon: '🏆', color: '#f9a825' },
  ];

  const statCards = isStudent ? studentStatCards : adminStatCards;

  const gradeChartData = gradeDist.map((g) => ({
    label: g.grade,
    value: g.count,
  }));

  const subjectChartData = subjectPerf.slice(0, 8).map((s) => ({
    label: s._id,
    value: parseFloat(s.avgScore.toFixed(1)),
  }));

  const trendData = [
    { label: 'Jan', value: 72 },
    { label: 'Feb', value: 74 },
    { label: 'Mar', value: 78 },
    { label: 'Apr', value: 76 },
    { label: 'May', value: 80 },
    { label: 'Jun', value: 83 },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Welcome back, {user?.name || 'User'}!
            {summary && (
              <span className="summary-update">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            )}
          </p>
        </div>
        {!isStudent && (
          <div className="page-actions">
            <div className="time-range-selector">
              <button
                className={`btn btn-sm ${timeRange === 'semester' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setTimeRange('semester')}
              >
                This Semester
              </button>
              <button
                className={`btn btn-sm ${timeRange === 'year' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setTimeRange('year')}
              >
                This Year
              </button>
            </div>
            <ExportOptions type="performances" />
          </div>
        )}
      </div>

      <div className="stats-grid">
        {statCards.map((card) => (
          <div key={card.label} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: card.color + '18', color: card.color }}>
              {card.icon}
            </div>
            <div className="stat-info">
              <p className="stat-label">{card.label}</p>
              <p className="stat-value">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {isStudent ? (
        <div className="dashboard-grid">
          <div className="dashboard-card chart-card">
            <BarChart
              data={[
                { label: 'Math', value: 82 },
                { label: 'Physics', value: 75 },
                { label: 'CS', value: 88 },
                { label: 'English', value: 70 },
              ]}
              xKey="label"
              yKey="value"
              title="My Subject Scores"
              color="#2e7d32"
            />
          </div>

          <div className="dashboard-card chart-card">
            <PieChart
              data={[
                { label: 'A+', value: 1 },
                { label: 'A', value: 2 },
                { label: 'B+', value: 1 },
              ]}
              labelKey="label"
              valueKey="value"
              title="My Grade Distribution"
            />
          </div>

          <div className="dashboard-card chart-card">
            <LineChart
              data={trendData}
              xKey="label"
              yKey="value"
              title="My Performance Trend (6 Months)"
              color="#00bcd4"
            />
          </div>

          <div className="dashboard-card chart-card">
            <div className="subject-performance-summary">
              <h3 className="chart-title">My Recent Courses</h3>
              <table className="mini-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Grade</th>
                    <th>Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { course: 'Data Structures', grade: 'A', semester: 1 },
                    { course: 'Calculus I', grade: 'A', semester: 1 },
                    { course: 'Mechanics', grade: 'B+', semester: 2 },
                  ].map((s, i) => (
                    <tr key={i}>
                      <td>{s.course}</td>
                      <td><span className={`grade-badge grade-${s.grade.toLowerCase()}`}>{s.grade}</span></td>
                      <td>Sem {s.semester}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard-grid">
          <div className="dashboard-card chart-card">
            <BarChart
              data={subjectChartData}
              xKey="label"
              yKey="value"
              title="Average Score by Subject"
              color="#1a237e"
            />
          </div>

          <div className="dashboard-card chart-card">
            <PieChart
              data={gradeChartData}
              labelKey="label"
              valueKey="value"
              title="Grade Distribution"
            />
          </div>

          <div className="dashboard-card chart-card">
            <LineChart
              data={trendData}
              xKey="label"
              yKey="value"
              title="Performance Trend (6 Months)"
              color="#00bcd4"
            />
          </div>

          <div className="dashboard-card chart-card">
            <div className="subject-performance-summary">
              <h3 className="chart-title">Top Performing Subjects</h3>
              <table className="mini-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Avg Score</th>
                    <th>Students</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectPerf.slice(0, 6).map((s) => (
                    <tr key={s._id}>
                      <td>{s._id}</td>
                      <td>
                        <span className={`score-badge ${s.avgScore >= 70 ? 'high' : s.avgScore >= 50 ? 'medium' : 'low'}`}>
                          {s.avgScore.toFixed(1)}%
                        </span>
                      </td>
                      <td>{s.studentCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {!isStudent && (
        <div className="widgets-grid">
          <NotificationWidget />
          <RecentActivity />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
