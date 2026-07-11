import React from 'react';
import { Link } from 'react-router-dom';
import { SchoolIcon, TrendingUpIcon, UsersIcon, BarChartIcon, BookOpenIcon } from '../components/Icons';
import './Home.css';

const Home = () => {
  const stats = [
    { value: '500+', label: 'Students' },
    { value: '95%', label: 'Pass Rate' },
    { value: '24', label: 'Courses' },
    { value: '4.8', label: 'Avg GPA' },
  ];

  const features = [
    { icon: TrendingUpIcon, title: 'Performance Tracking', desc: 'Monitor individual and class-wide academic performance in real-time with detailed analytics.' },
    { icon: BarChartIcon, title: 'Analytics and Reports', desc: 'Generate detailed reports with visual insights, trends, and data-driven recommendations.' },
    { icon: UsersIcon, title: 'Multi-Role Access', desc: 'Role-based dashboards for students, teachers, and administrators with tailored views.' },
    { icon: BookOpenIcon, title: 'Course Management', desc: 'Manage courses, grades, attendance, and student records from a unified platform.' },
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <SchoolIcon size={16} color="#00bcd4" />
              <span>Student Performance Analytics Portal</span>
            </div>
            <h1>Data-Driven Academic<br />Performance Management</h1>
            <p>Empowering educators and students with actionable insights to enhance academic performance, track progress, and achieve excellence through advanced analytics.</p>
            <div className="hero-buttons">
              <Link to="/login" className="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                Get Started
              </Link>
              <Link to="/register" className="btn btn-outline-light">Create Account</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-stat">
                <span className="hero-stat-value">87%</span>
                <span className="hero-stat-label">Average Score</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">A+</span>
                <span className="hero-stat-label">Top Grade</span>
              </div>
            </div>
            <div className="hero-metrics">
              <div className="hero-metric">
                <span className="hero-metric-dot" style={{ background: '#2e7d32' }} />
                <span>Student Dashboard</span>
              </div>
              <div className="hero-metric">
                <span className="hero-metric-dot" style={{ background: '#1565c0' }} />
                <span>Teacher Dashboard</span>
              </div>
              <div className="hero-metric">
                <span className="hero-metric-dot" style={{ background: '#6a1b9a' }} />
                <span>Admin Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid-home">
            {stats.map((stat, i) => (
              <div className="stat-card-home" key={i}>
                <h3 className="stat-value-home">{stat.value}</h3>
                <p className="stat-label-home">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-header">
            <h2 className="features-title">Key Features</h2>
            <p className="features-subtitle">Everything you need to manage and analyze student performance in one platform</p>
          </div>
          <div className="features-grid-home">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div className="feature-card-home" key={i}>
                  <div className="feature-icon-box">
                    <Icon size={24} color="#1a237e" />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Academic Performance?</h2>
            <p>Join thousands of educators and students using SPAP to drive academic success through data-driven insights.</p>
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
