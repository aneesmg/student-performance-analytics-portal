import React from 'react';
import './About.css';

const About = () => {
  const team = [
    { name: 'Sarah Johnson', role: 'Lead Developer', avatar: 'SJ' },
    { name: 'Mark Chen', role: 'Data Analyst', avatar: 'MC' },
    { name: 'Emily Davis', role: 'UI/UX Designer', avatar: 'ED' },
  ];

  return (
    <div className="about page">
      <div className="container">
        <section className="about-hero">
          <h1>About SPAP</h1>
          <p>Student Performance Analytics Portal is a comprehensive platform designed to transform how educational institutions track, analyze, and improve student academic performance.</p>
        </section>

        <section className="mission-section">
          <div className="card">
            <h2>Our Mission</h2>
            <p>To provide educators and students with powerful analytical tools that make academic data meaningful, actionable, and accessible to everyone involved in the learning process.</p>
          </div>
          <div className="card">
            <h2>Our Vision</h2>
            <p>A world where every student's potential is realized through data-informed teaching, personalized learning paths, and continuous feedback loops between educators and learners.</p>
          </div>
        </section>

        <section className="values-section">
          <h2 className="section-title">Core Values</h2>
          <div className="values-grid">
            <div className="value-item card">
              <h3>Data Integrity</h3>
              <p>Accurate, reliable, and secure data management is the foundation of everything we build.</p>
            </div>
            <div className="value-item card">
              <h3>Accessibility</h3>
              <p>Our platform is designed for all users — administrators, teachers, students, and parents.</p>
            </div>
            <div className="value-item card">
              <h3>Innovation</h3>
              <p>We continuously evolve our analytics to meet the changing needs of modern education.</p>
            </div>
            <div className="value-item card">
              <h3>Empowerment</h3>
              <p>We believe data should empower, not overwhelm — turning insights into action.</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2 className="section-title">Meet the Team</h2>
          <div className="team-grid">
            {team.map((member, i) => (
              <div className="team-card card" key={i}>
                <div className="team-avatar">{member.avatar}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
