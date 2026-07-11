import React, { useEffect } from 'react';
import { AlertCircleIcon, CheckCircleIcon, XIcon } from './Icons';
import './Alert.css';

const alertConfig = {
  success: { icon: CheckCircleIcon, className: 'alert-success' },
  error: { icon: AlertCircleIcon, className: 'alert-error' },
  warning: { icon: AlertCircleIcon, className: 'alert-warning' },
  info: { icon: AlertCircleIcon, className: 'alert-info' },
};

const Alert = ({ type = 'info', message, onClose, dismissible, timeout = 5000 }) => {
  const config = alertConfig[type] || alertConfig.info;
  const Icon = config.icon;

  useEffect(() => {
    if (!dismissible || !onClose || !timeout) return;
    const timer = setTimeout(onClose, timeout);
    return () => clearTimeout(timer);
  }, [dismissible, onClose, timeout]);

  if (!message) return null;

  return (
    <div className={`alert ${config.className}`}>
      <span className="alert-icon">
        <Icon size={20} />
      </span>
      <span className="alert-message">{message}</span>
      {dismissible && onClose && (
        <button className="alert-close" onClick={onClose} aria-label="Close alert">
          <XIcon size={16} />
        </button>
      )}
    </div>
  );
};

export default Alert;
