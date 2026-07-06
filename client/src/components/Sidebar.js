import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  DashboardIcon, UsersIcon, UserIcon, BookOpenIcon, GraduationIcon,
  GradeIcon, AttendanceIcon, LogoutIcon, MenuIcon, XIcon,
  SchoolIcon, BarChartIcon,
} from './Icons';
import './Sidebar.css';

const studentMenu = [
  { path: '/student/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { path: '/student/grades', label: 'My Grades', icon: GradeIcon },
  { path: '/student/attendance', label: 'Attendance', icon: AttendanceIcon },
  { path: '/student/profile', label: 'Profile', icon: UserIcon },
];

const teacherMenu = [
  { path: '/teacher/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { path: '/teacher/students', label: 'My Students', icon: UsersIcon },
  { path: '/teacher/grades', label: 'Manage Grades', icon: GradeIcon },
  { path: '/teacher/courses', label: 'Courses', icon: BookOpenIcon },
  { path: '/teacher/profile', label: 'Profile', icon: UserIcon },
];

const adminMenu = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { path: '/admin/users', label: 'Manage Users', icon: UsersIcon },
  { path: '/admin/courses', label: 'Courses', icon: BookOpenIcon },
  { path: '/admin/students', label: 'All Students', icon: GraduationIcon },
  { path: '/admin/grades', label: 'All Grades', icon: BarChartIcon },
  { path: '/admin/profile', label: 'Profile', icon: UserIcon },
];

const roleConfig = {
  student: { menu: studentMenu, label: 'Student', color: '#2e7d32' },
  teacher: { menu: teacherMenu, label: 'Teacher', color: '#1565c0' },
  admin: { menu: adminMenu, label: 'Admin', color: '#6a1b9a' },
};

const Sidebar = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  if (!user) return null;

  const config = roleConfig[user.role] || roleConfig.student;
  const menuItems = config.menu;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <button className="sidebar-mobile-toggle" onClick={() => setMobileOpen(true)}>
        <MenuIcon size={22} color="#fff" />
      </button>

      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}

      <aside ref={sidebarRef} className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <SchoolIcon size={28} color="#00bcd4" />
            {!collapsed && <span className="sidebar-brand-text">SPAP</span>}
          </Link>
          <button className="sidebar-close" onClick={() => setMobileOpen(false)}>
            <XIcon size={18} color="#fff" />
          </button>
          <button className="sidebar-collapse-btn" onClick={onToggle}>
            <MenuIcon size={16} color="rgba(255,255,255,0.6)" />
          </button>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-avatar" style={{ background: config.color }}>
            {user.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          {!collapsed && (
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{user.name?.split(' ')[0] || 'User'}</span>
              <span className="sidebar-user-role" style={{ color: config.color }}>{config.label}</span>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={18} color={isActive ? '#fff' : 'rgba(255,255,255,0.65)'} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogout}>
            <LogoutIcon size={18} color="rgba(255,255,255,0.65)" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
