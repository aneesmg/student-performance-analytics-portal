import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import { UserIcon, SettingsIcon, MoonIcon, SunIcon, MailIcon, LockIcon, CheckCircleIcon, AlertCircleIcon } from '../components/Icons';
import './Settings.css';

const TABS = [
  { key: 'profile', label: 'Profile', icon: UserIcon },
  { key: 'password', label: 'Password', icon: LockIcon },
  { key: 'preferences', label: 'Preferences', icon: SettingsIcon },
];

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState(() => ({
    name: user?.name || 'User',
    phone: user?.phone || '',
    email: user?.email || '',
  }));
  const [password, setPassword] = useState({ current: '', newPass: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [preferences, setPreferences] = useState(() => {
    const stored = localStorage.getItem('settings_preferences');
    return stored ? JSON.parse(stored) : { theme: 'light', emailNotifications: true, pushNotifications: false };
  });

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(t);
    }
  }, [saved]);

  const saveProfile = () => {
    localStorage.setItem('settings_profile', JSON.stringify(profile));
    setSaved(true);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);
    if (!password.current || !password.newPass || !password.confirm) {
      setPasswordError('All fields are required');
      return;
    }
    if (password.newPass.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    if (password.newPass !== password.confirm) {
      setPasswordError('Passwords do not match');
      return;
    }
    localStorage.setItem('settings_password', JSON.stringify({ current: password.current, newPass: password.newPass }));
    setPasswordSuccess(true);
    setPassword({ current: '', newPass: '', confirm: '' });
  };

  const togglePreference = (key) => {
    const updated = { ...preferences, [key]: !preferences[key] };
    setPreferences(updated);
    localStorage.setItem('settings_preferences', JSON.stringify(updated));
  };

  const toggleThemeMode = () => {
    toggleTheme();
  };

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account settings">
      <div className="settings-layout">
        <div className="settings-tabs">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`settings-tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <div className="card settings-card">
              <h3>Profile Information</h3>
              <p className="settings-subtext">Update your personal details</p>
              <div className="settings-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value={profile.email} readOnly className="readonly" />
                  <span className="form-hint">Email cannot be changed</span>
                </div>
                <div className="settings-actions">
                  <button className="btn btn-primary" onClick={saveProfile}>
                    {saved ? <><CheckCircleIcon size={16} /> Saved</> : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="card settings-card">
              <h3>Change Password</h3>
              <p className="settings-subtext">Ensure your account is secure</p>
              <form className="settings-form" onSubmit={handlePasswordChange}>
                {passwordError && (
                  <div className="settings-alert error"><AlertCircleIcon size={16} />{passwordError}</div>
                )}
                {passwordSuccess && (
                  <div className="settings-alert success"><CheckCircleIcon size={16} />Password updated successfully</div>
                )}
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })} placeholder="Enter current password" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" value={password.newPass} onChange={(e) => setPassword({ ...password, newPass: e.target.value })} placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" value={password.confirm} onChange={(e) => setPassword({ ...password, confirm: e.target.value })} placeholder="Confirm new password" />
                </div>
                <div className="settings-actions">
                  <button type="submit" className="btn btn-primary">Update Password</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'preferences' && (
            <>
              <div className="card settings-card">
                <h3>Theme</h3>
                <p className="settings-subtext">Choose your preferred appearance</p>
                <div className="theme-toggle-row">
                  <span className="theme-label">{preferences.theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
                  <button className="theme-toggle-btn" onClick={toggleThemeMode}>
                    <div className={`theme-toggle-track ${theme === 'dark' ? 'dark' : ''}`}>
                      <div className="theme-toggle-thumb">
                        {theme === 'light' ? <SunIcon size={14} /> : <MoonIcon size={14} />}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="card settings-card">
                <h3>Notification Preferences</h3>
                <p className="settings-subtext">Manage how you receive notifications</p>
                <div className="toggle-list">
                  <div className="toggle-row">
                    <div className="toggle-info">
                      <MailIcon size={18} />
                      <div>
                        <span className="toggle-label">Email Notifications</span>
                        <span className="toggle-desc">Receive updates via email</span>
                      </div>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={preferences.emailNotifications} onChange={() => togglePreference('emailNotifications')} />
                      <span className="switch-slider" />
                    </label>
                  </div>
                  <div className="toggle-row">
                    <div className="toggle-info">
                      <AlertCircleIcon size={18} />
                      <div>
                        <span className="toggle-label">Push Notifications</span>
                        <span className="toggle-desc">Receive push notifications in browser</span>
                      </div>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={preferences.pushNotifications} onChange={() => togglePreference('pushNotifications')} />
                      <span className="switch-slider" />
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
