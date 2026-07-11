import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!email) { setError('Please enter your email'); return; }
    setLoading(true);
    try {
      const res = await authAPI.forgotPassword({ email });
      setMessage(res.data.message);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card card">
          <div className="auth-header">
            <span className="auth-icon">&#9670;</span>
            <h1>Forgot Password</h1>
            <p>Enter your email to receive a password reset link</p>
          </div>
          {error && <div className="auth-alert error">{error}</div>}
          {message && <div className="auth-alert success">{message}</div>}
          {!sent ? (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your registered email" />
              </div>
              <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
                {loading ? <span className="btn-spinner" /> : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <div className="auth-form">
              <div className="sent-info">
                <p>If an account exists with that email, you will receive a password reset link shortly.</p>
              </div>
              <Link to="/login" className="btn btn-outline auth-btn">Back to Login</Link>
            </div>
          )}
          <div className="auth-footer">
            Remember your password? <Link to="/login" className="auth-link">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
