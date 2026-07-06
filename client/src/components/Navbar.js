import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/reports', label: 'Reports' },
    { path: '/students', label: 'Students' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setIsOpen(false);
    navigate('/');
  };

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
          <li className="nav-auth-item">
            {user ? (
              <div className="nav-user" ref={dropdownRef}>
                <button className="nav-user-btn" onClick={() => setShowDropdown(!showDropdown)}>
                  <span className="nav-avatar">{user.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                  <span className="nav-username">{user.name?.split(' ')[0]}</span>
                </button>
                {showDropdown && (
                  <div className="nav-dropdown">
                    <div className="dropdown-header">
                      <p className="dropdown-name">{user.name}</p>
                      <p className="dropdown-email">{user.email}</p>
                      <span className="dropdown-role">{user.role}</span>
                    </div>
                    <div className="dropdown-divider" />
                    <Link to="/dashboard" className="dropdown-item" onClick={() => { setShowDropdown(false); setIsOpen(false); }}>Dashboard</Link>
                    <Link to="/students" className="dropdown-item" onClick={() => { setShowDropdown(false); setIsOpen(false); }}>Students</Link>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item dropdown-logout" onClick={handleLogout}>Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="nav-auth-links">
                <Link to="/login" className="btn btn-sm btn-outline-light" onClick={() => setIsOpen(false)}>Sign In</Link>
                <Link to="/register" className="btn btn-sm btn-accent" onClick={() => setIsOpen(false)}>Register</Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
