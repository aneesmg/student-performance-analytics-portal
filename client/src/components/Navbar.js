import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/reports', label: 'Reports' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">&#9670;</span>
          <span className="brand-text">SPAP</span>
        </Link>

        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span className={`hamburger ${isOpen ? 'active' : ''}`}></span>
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
