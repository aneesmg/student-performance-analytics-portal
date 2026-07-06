import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

const DashboardLayout = ({ children, title, subtitle }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main className={`dashboard-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {(title || subtitle) && (
          <div className="dashboard-page-header">
            {title && <h1 className="dashboard-title">{title}</h1>}
            {subtitle && <p className="dashboard-subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
