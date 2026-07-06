import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-brand">SPAP</h3>
            <p className="footer-desc">
              Student Performance Analytics Portal — empowering educators and students with data-driven insights.
            </p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="contact-list">
              <li>info@codiora.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Tech Street, Silicon Valley, CA</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {year} CODIORA. All rights reserved. | Our Code Builds Your Vision</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
