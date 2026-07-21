import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const roleLinks = {
    admin: [
      { to: '/', label: 'Dashboard', icon: '📊' },
      { to: '/students', label: 'Students', icon: '👥' },
      { to: '/reports', label: 'Reports', icon: '📈' },
    ],
    teacher: [
      { to: '/', label: 'Dashboard', icon: '📊' },
      { to: '/students', label: 'Students', icon: '👥' },
      { to: '/reports', label: 'Reports', icon: '📈' },
    ],
    student: [
      { to: '/', label: 'Dashboard', icon: '📊' },
    ],
  };

  const links = roleLinks[user?.role] || roleLinks.student;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">SPAP</span>
          <span className="brand-text">Analytics Portal</span>
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <div className="navbar-links">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-icon">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="navbar-user">
            <Link to="/profile" className={`nav-link user-link ${isActive('/profile') ? 'active' : ''}`}>
              <div className="user-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="user-info">
                <span className="user-name">{user?.name || 'User'}</span>
                <span className="user-role">{user?.role || ''}</span>
              </div>
            </Link>
            <button className="btn-logout" onClick={logout} title="Logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
