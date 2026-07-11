import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { studentAPI, performanceAPI } from '../services/api';
import { UserIcon, EditIcon, CheckCircleIcon, XIcon, MailIcon, BookOpenIcon } from '../components/Icons';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [performance, setPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', phone: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileId = id || user?.id;
        if (!profileId) {
          setProfile(user);
          setLoading(false);
          return;
        }
        const studentRes = await studentAPI.getById(profileId);
        setProfile(studentRes.data);
        const studentMongoId = studentRes.data._id;
        try {
          const perfRes = await performanceAPI.getByStudent(studentMongoId);
          setPerformance(Array.isArray(perfRes.data) ? perfRes.data : [perfRes.data]);
        } catch {
          setPerformance([]);
        }
      } catch (err) {
        if (user) {
          setProfile(user);
        } else {
          setError('Failed to load profile');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user]);

  const startEditing = () => {
    setEditForm({ name: profile?.name || user?.name || '', phone: profile?.phone || '' });
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
    setEditForm({ name: '', phone: '' });
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const updated = { ...(profile || user), name: editForm.name, phone: editForm.phone };
      setProfile(updated);
      if (!id) updateUser(updated);
      setEditing(false);
    } catch {
      setError('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const profileData = profile || user;
  const name = profileData?.name || 'User';
  const email = profileData?.email || '';
  const role = profileData?.role || user?.role || 'student';
  const phone = profileData?.phone || '';
  const avatarLetter = name.charAt(0)?.toUpperCase() || 'U';

  const avgScore = performance.length > 0 ? Math.round(performance.reduce((s, p) => s + (p.overallPercentage || p.totalScore || p.score || 0), 0) / performance.length) : 0;
  const avgAttendance = performance.length > 0 ? Math.round(performance.reduce((s, p) => s + (p.attendance || 0), 0) / performance.length) : 0;
  const bestGrade = performance.length > 0 ? performance.reduce((best, p) => (!best || (p.grade || '').localeCompare(best) > 0 ? (p.grade || '') : best), '') : 'N/A';

  const roleColors = { student: '#2e7d32', teacher: '#1565c0', admin: '#6a1b9a' };
  const roleColor = roleColors[role] || '#2e7d32';

  if (loading) return <DashboardLayout title="Profile"><div className="dashboard-loading" /></DashboardLayout>;
  if (error && !profileData) return <DashboardLayout title="Profile"><div className="page-loading"><p className="error-text">{error}</p></div></DashboardLayout>;

  return (
    <DashboardLayout title="My Profile" subtitle="Manage your personal information">
      <div className="profile-grid">
        <div className="card profile-info-card">
          <div className="profile-avatar" style={{ background: roleColor }}>
            <span>{avatarLetter}</span>
          </div>
          {editing ? (
            <div className="profile-edit-form">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <UserIcon size={18} color="#9e9e9e" />
                  <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Your name" />
                </div>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <div className="input-wrapper">
                  <input type="text" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} placeholder="Phone number" />
                </div>
              </div>
              <div className="profile-edit-actions">
                <button className="btn btn-primary btn-sm" onClick={saveProfile} disabled={saving}>
                  <CheckCircleIcon size={16} color="#fff" /> {saving ? 'Saving...' : 'Save'}
                </button>
                <button className="btn btn-outline btn-sm" onClick={cancelEditing}>
                  <XIcon size={16} /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="profile-name">{name}</h1>
              <span className="role-badge" style={{ background: `${roleColor}15`, color: roleColor }}>{role}</span>
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label"><MailIcon size={14} color="#9e9e9e" /> Email</span>
                  <span className="detail-value">{email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label"><BookOpenIcon size={14} color="#9e9e9e" /> Role</span>
                  <span className="detail-value" style={{ textTransform: 'capitalize' }}>{role}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{phone || 'Not set'}</span>
                </div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={startEditing} style={{ marginTop: 16, width: '100%' }}>
                <EditIcon size={16} /> Edit Profile
              </button>
            </>
          )}
        </div>

        <div className="profile-stats-grid">
          <div className="card profile-stat-card">
            <span className="profile-stat-value">{avgScore}%</span>
            <span className="profile-stat-label">Average Score</span>
          </div>
          <div className="card profile-stat-card">
            <span className="profile-stat-value">{avgAttendance}%</span>
            <span className="profile-stat-label">Attendance</span>
          </div>
          <div className="card profile-stat-card">
            <span className="profile-stat-value">{bestGrade}</span>
            <span className="profile-stat-label">Best Grade</span>
          </div>
          <div className="card profile-stat-card">
            <span className="profile-stat-value">{performance.length}</span>
            <span className="profile-stat-label">Records</span>
          </div>
        </div>

        <div className="card profile-perf-card">
          <h2>Performance Records</h2>
          {performance.length === 0 ? (
            <p className="no-data">No performance records available</p>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Grade</th>
                    <th>Attendance</th>
                    <th>Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {performance.map((p, i) => (
                    <tr key={i}>
                      <td className="cell-primary">{p.course || 'General'}</td>
                      <td><span className="score-value">{p.overallPercentage || p.totalScore || p.score || 0}%</span></td>
                      <td><span className={`grade-badge grade-${(p.grade || 'N')[0]?.toLowerCase() || 'n'}`}>{p.grade || 'N/A'}</span></td>
                      <td>{p.attendance || 0}%</td>
                      <td>{p.semester || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
