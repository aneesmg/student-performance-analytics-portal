import React, { useState } from 'react';

const defaultNotifications = [
  { id: 1, type: 'info', message: 'System update scheduled for tonight at 2 AM', time: '2 hours ago', read: false },
  { id: 2, type: 'success', message: 'Performance data has been updated for Semester 2', time: '5 hours ago', read: false },
  { id: 3, type: 'warning', message: '5 students have below 40% attendance', time: '1 day ago', read: true },
  { id: 4, type: 'info', message: 'New semester grades are being uploaded', time: '2 days ago', read: true },
  { id: 5, type: 'success', message: 'Export report for Q1 2026 is ready', time: '3 days ago', read: true },
];

function NotificationWidget() {
  const [notifications] = useState(defaultNotifications);
  const [showAll, setShowAll] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayed = showAll ? notifications : notifications.slice(0, 3);

  return (
    <div className="widget notification-widget">
      <div className="widget-header">
        <h3 className="widget-title">
          Notifications
          {unreadCount > 0 && <span className="badge-notification">{unreadCount}</span>}
        </h3>
        <button className="widget-action" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show Less' : `View All (${notifications.length})`}
        </button>
      </div>
      <div className="notification-list">
        {displayed.map((n) => (
          <div key={n.id} className={`notification-item ${n.read ? 'read' : 'unread'}`}>
            <div className={`notification-dot ${n.type}`}></div>
            <div className="notification-content">
              <p className="notification-message">{n.message}</p>
              <span className="notification-time">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationWidget;
