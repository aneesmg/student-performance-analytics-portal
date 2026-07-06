import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, LoginIcon, SchoolIcon } from '../components/Icons';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      const role = data.user.role;
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <SchoolIcon size={36} color="#00bcd4" />
            </div>
            <h1>Sign In</h1>
            <p>Welcome back to Student Performance Analytics Portal</p>
          </div>

          {error && (
            <div className="auth-alert error">
              <span className="auth-alert-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c62828" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <MailIcon size={18} color="#9e9e9e" />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <LockIcon size={18} color="#9e9e9e" />
                <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" />
                <button type="button" className="input-suffix" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                  {showPassword ? <EyeOffIcon size={18} color="#9e9e9e" /> : <EyeIcon size={18} color="#9e9e9e" />}
                </button>
              </div>
            </div>
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            </div>
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? (
                <span className="btn-spinner" />
              ) : (
                <><LoginIcon size={18} color="#fff" /> Sign In</>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span className="auth-divider-line" />
            <span className="auth-divider-text">or continue with</span>
            <span className="auth-divider-line" />
          </div>

          <div className="auth-role-hints">
            <div className="role-hint">
              <span className="role-hint-dot" style={{ background: '#2e7d32' }} />
              <span>Student - View grades and progress</span>
            </div>
            <div className="role-hint">
              <span className="role-hint-dot" style={{ background: '#1565c0' }} />
              <span>Teacher - Manage courses and students</span>
            </div>
            <div className="role-hint">
              <span className="role-hint-dot" style={{ background: '#6a1b9a' }} />
              <span>Admin - Full system management</span>
            </div>
          </div>

          <div className="auth-footer">
            Don't have an account? <Link to="/register" className="auth-link">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
