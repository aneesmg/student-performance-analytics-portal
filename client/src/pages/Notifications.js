import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import {
  CheckCircleIcon, AlertCircleIcon, BellIcon, XIcon,
  TrendingUpIcon, UserIcon, GradeIcon, MailIcon
} from '../components/Icons';
import './Notifications.css';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'success', title: 'Grade Posted', message: 'Your grades for Mathematics have been posted. Check your performance summary.', timestamp: '2 hours ago', read: false },
  { id: 2, type: 'warning', title: 'Attendance Alert', message: 'You have missed 3 consecutive classes in Physics. Please ensure regular attendance.', timestamp: '5 hours ago', read: false },
  { id: 3, type: 'error', title: 'Assignment Overdue', message: 'The Data Structures assignment was due yesterday. Please submit immediately.', timestamp: '1 day ago', read: false },
  { id: 4, type: 'info', title: 'New Course Available', message: 'A new elective course "Artificial Intelligence" is now open for registration.', timestamp: '2 days ago', read: true },
  { id: 5, type: 'success', title: 'Achievement Unlocked', message: 'Congratulations! You have achieved 95% attendance this semester.', timestamp: '3 days ago', read: true },
  { id: 6, type: 'info', title: 'System Update', message: 'The portal will be undergoing maintenance on Saturday from 2-4 AM.', timestamp: '4 days ago', read: true },
  { id: 7, type: 'warning', title: 'Exam Schedule', message: 'Final exam schedule has been published. Check your exam dates and rooms.', timestamp: '5 days ago', read: true },
];

const typeConfig = {
  success: { icon: CheckCircleIcon, bg: '#f0fdf4', color: '#2e7d32' },
  error: { icon: AlertCircleIcon, bg: '#fef2f2', color: '#c62828' },
  warning: { icon: AlertCircleIcon, bg: '#fffbeb', color: '#f59e0b' },
  info: { icon: BellIcon, bg: '#eff6ff', color: '#2563eb' },
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout title="Notifications" subtitle="Stay updated with system alerts">
      <div className="notifications-header-bar">
        <span className="notifications-count">
          {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
        </span>
        {unreadCount > 0 && (
          <button className="btn btn-sm btn-outline" onClick={markAllRead}>
            <CheckCircleIcon size={15} /> Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="notifications-empty">
          <BellIcon size={48} color="#d1d5db" />
          <h3>No notifications</h3>
          <p>You're all caught up! New notifications will appear here.</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map(n => {
            const config = typeConfig[n.type];
            const Icon = config.icon;
            return (
              <div key={n.id} className={`notification-item ${n.read ? 'read' : 'unread'}`}>
                <div className="notification-icon" style={{ background: config.bg, color: config.color }}>
                  <Icon size={18} />
                </div>
                <div className="notification-body">
                  <div className="notification-header">
                    <h4>{n.title}</h4>
                    <div className="notification-actions">
                      <button className="notification-action-btn" title={n.read ? 'Mark as unread' : 'Mark as read'} onClick={() => toggleRead(n.id)}>
                        {n.read ? <MailIcon size={14} /> : <CheckCircleIcon size={14} />}
                      </button>
                      <button className="notification-action-btn danger" title="Delete" onClick={() => deleteNotification(n.id)}>
                        <XIcon size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="notification-message">{n.message}</p>
                  <span className="notification-time">{n.timestamp}</span>
                </div>
                <div className="notification-read-indicator">
                  <span className={`read-dot ${n.read ? '' : 'unread-dot'}`} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Notifications;
