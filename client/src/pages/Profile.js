import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { studentAPI, performanceAPI } from '../services/api';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [performance, setPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentRes = await studentAPI.getById(id);
        setStudent(studentRes.data);
        const studentMongoId = studentRes.data._id;
        try {
          const perfRes = await performanceAPI.getByStudent(studentMongoId);
          setPerformance(Array.isArray(perfRes.data) ? perfRes.data : [perfRes.data]);
        } catch {
          setPerformance([]);
        }
      } catch (err) {
        setError('Failed to load student profile');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="page-loading"><div className="loader" /><p>Loading profile...</p></div>;
  if (error) return <div className="page-loading"><p className="error-text">{error}</p><Link to="/students" className="btn btn-primary">Back to Students</Link></div>;
  if (!student) return <div className="page-loading"><p>Student not found</p><Link to="/students" className="btn btn-primary">Back to Students</Link></div>;

  const avgScore = performance.length > 0 ? Math.round(performance.reduce((s, p) => s + (p.overallPercentage || p.totalScore || p.score || 0), 0) / performance.length) : 0;
  const avgAttendance = performance.length > 0 ? Math.round(performance.reduce((s, p) => s + (p.attendance || 0), 0) / performance.length) : 0;
  const bestGrade = performance.length > 0 ? performance.reduce((best, p) => (!best || (p.grade || '').localeCompare(best) > 0 ? (p.grade || '') : best), '') : 'N/A';

  return (
    <div className="profile-page page">
      <div className="container">
        <div className="profile-header">
          <Link to="/students" className="back-link">&larr; Back to Students</Link>
        </div>

        <div className="profile-grid">
          <div className="card profile-info-card">
            <div className="profile-avatar">
              <span>{student.name?.charAt(0)?.toUpperCase() || '?'}</span>
            </div>
            <h1 className="profile-name">{student.name}</h1>
            <p className="profile-id">{student.studentId || `STU${student._id?.slice(-4)?.toUpperCase() || '0000'}`}</p>
            <div className="profile-details">
              <div className="detail-item"><span className="detail-label">Email</span><span className="detail-value">{student.email}</span></div>
              <div className="detail-item"><span className="detail-label">Course</span><span className="detail-value">{student.course}</span></div>
              <div className="detail-item"><span className="detail-label">Semester</span><span className="detail-value">{student.semester}</span></div>
              <div className="detail-item"><span className="detail-label">Gender</span><span className="detail-value">{student.gender || 'N/A'}</span></div>
              <div className="detail-item"><span className="detail-label">Phone</span><span className="detail-value">{student.phone || 'N/A'}</span></div>
              <div className="detail-item"><span className="detail-label">Enrolled</span><span className="detail-value">{student.enrollmentYear || 'N/A'}</span></div>
            </div>
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
                <table className="profile-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Score</th>
                      <th>Grade</th>
                      <th>Attendance</th>
                      <th>Semester</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performance.map((p, i) => (
                      <tr key={i}>
                        <td>{p.course || 'General'}</td>
                        <td><span className="score-value">{p.overallPercentage || p.totalScore || p.score || 0}%</span></td>
                        <td><span className={`grade-badge grade-${(p.grade || 'N')[0]?.toLowerCase() || 'n'}`}>{p.grade || 'N/A'}</span></td>
                        <td>{p.attendance || 0}%</td>
                        <td>{p.semester || 'N/A'}</td>
                        <td>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
