import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const stats = [
    { value: '500+', label: 'Students' },
    { value: '95%', label: 'Pass Rate' },
    { value: '24', label: 'Courses' },
    { value: '4.8', label: 'Avg GPA' },
  ];

  const features = [
    { icon: '📊', title: 'Performance Tracking', desc: 'Monitor individual and class-wide academic performance in real-time.' },
    { icon: '📈', title: 'Analytics & Reports', desc: 'Generate detailed reports with visual insights and trends.' },
    { icon: '👩‍🏫', title: 'Teacher Dashboard', desc: 'Manage student records, grades, and attendance from one place.' },
    { icon: '🎯', title: 'Goal Setting', desc: 'Set academic targets and track progress throughout the semester.' },
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Student Performance<br />Analytics Portal</h1>
            <p>Empowering educators and students with data-driven insights to enhance academic performance and achieve excellence.</p>
            <div className="hero-buttons">
              <Link to="/dashboard" className="btn btn-primary">Explore Dashboard</Link>
              <Link to="/about" className="btn btn-outline">Learn More</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-stat">
                <span className="hero-stat-value">87%</span>
                <span className="hero-stat-label">Average Score</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">A+</span>
                <span className="hero-stat-label">Top Grade</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div className="stat-card card" key={i}>
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <p className="section-subtitle">Everything you need to manage and analyze student performance</p>
          <div className="features-grid">
            {features.map((feature, i) => (
              <div className="feature-card card" key={i}>
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
