import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

function Profile() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setMessage({ type: 'error', text: 'Name cannot be empty' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const res = await authAPI.updateProfile({ name: form.name.trim() });
      updateUser(res.data.data.user);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setEditing(false);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' });
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-avatar-large">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2>{user?.name}</h2>
              <p className="text-muted">{user?.email}</p>
              <span className={`role-badge role-${user?.role}`}>{user?.role}</span>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-row">
              <span className="detail-label">Name</span>
              <span className="detail-value">{user?.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email</span>
              <span className="detail-value">{user?.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Role</span>
              <span className="detail-value">
                <span className={`role-badge role-${user?.role}`}>{user?.role}</span>
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Member Since</span>
              <span className="detail-value">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Last Login</span>
              <span className="detail-value">
                {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'First login'}
              </span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn btn-primary" onClick={() => setEditing(!editing)}>
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {editing && (
            <form className="profile-edit-form" onSubmit={handleSubmit}>
              {message && (
                <div className={`form-message ${message.type}`}>{message.text}</div>
              )}
              <div className="form-group">
                <label htmlFor="edit-name">Name</label>
                <input
                  id="edit-name"
                  type="text"
                  className="form-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}
        </div>

        <div className="profile-stats-card">
          <h3>Account Summary</h3>
          <div className="stats-mini-grid">
            <div className="stat-mini-box">
              <span className="stat-mini-number">{user?.role === 'admin' ? 'Full' : user?.role === 'teacher' ? 'Manage' : 'View'}</span>
              <span className="stat-mini-desc">Access Level</span>
            </div>
            <div className="stat-mini-box">
              <span className="stat-mini-number">Active</span>
              <span className="stat-mini-desc">Account Status</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
