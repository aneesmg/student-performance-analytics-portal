import React from 'react';
import { BellIcon } from './Icons';
import './NotificationBell.css';

const NotificationBell = ({ count = 0 }) => {
  return (
    <button className="nb-button" aria-label={`Notifications${count > 0 ? ` (${count} unread)` : ''}`}>
      <BellIcon size={22} />
      {count > 0 && (
        <span className="nb-badge">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;
