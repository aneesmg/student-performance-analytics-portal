import React, { useState, useEffect, useCallback } from 'react';
import { reportAPI } from '../services/api';
import { BarChart, PieChart } from '../components/Charts';
import ExportOptions from '../components/ExportOptions';

function Reports() {
  const [summary, setSummary] = useState(null);
  const [gradeReport, setGradeReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [compareIds, setCompareIds] = useState('');
  const [comparison, setComparison] = useState(null);
  const [compareLoading, setCompareLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [summaryRes, gradeRes] = await Promise.all([
        reportAPI.getSummary(),
        reportAPI.getGradeReport(),
      ]);
      setSummary(summaryRes.data.data);
      setGradeReport(gradeRes.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCompare = async () => {
    if (!compareIds.trim()) return;
    setCompareLoading(true);
    try {
      const res = await reportAPI.compareStudents(compareIds);
      setComparison(res.data.data.comparison);
    } catch (err) {
      setError(err.response?.data?.message || 'Comparison failed');
    }
    setCompareLoading(false);
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner"></div>
        <p>Loading reports...</p>
      </div>
    );
  }

  const gradeChartData = gradeReport?.distribution?.map((g) => ({
    label: g.grade,
    value: g.count,
  })) || [];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Comprehensive performance analysis and exportable reports</p>
        </div>
        <ExportOptions type="performances" />
      </div>

      {error && <div className="form-error-banner">{error}</div>}

      <div className="tabs">
        <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`tab ${activeTab === 'grades' ? 'active' : ''}`} onClick={() => setActiveTab('grades')}>Grade Analysis</button>
        <button className={`tab ${activeTab === 'compare' ? 'active' : ''}`} onClick={() => setActiveTab('compare')}>Compare Students</button>
        <button className={`tab ${activeTab === 'subjects' ? 'active' : ''}`} onClick={() => setActiveTab('subjects')}>Subject Performance</button>
      </div>

      {activeTab === 'overview' && summary && (
        <div className="report-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-info">
                <p className="stat-label">Total Students</p>
                <p className="stat-value">{summary.summary?.totalStudents || 0}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-info">
                <p className="stat-label">Average Score</p>
                <p className="stat-value">{summary.summary?.averageScore || 0}%</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-info">
                <p className="stat-label">Pass Rate</p>
                <p className="stat-value">{summary.summary?.passRate || 0}%</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-info">
                <p className="stat-label">Records</p>
                <p className="stat-value">{summary.summary?.totalRecords || 0}</p>
              </div>
            </div>
          </div>

          <div className="report-insights">
            <h3>Key Insights</h3>
            <ul>
              {summary.summary?.averageScore < 60 && <li>Average score is below 60% — remedial actions recommended.</li>}
              {summary.summary?.averageAttendance < 75 && <li>Average attendance is below 75% — attendance programs needed.</li>}
              {summary.summary?.passRate > 80 && <li>Pass rate is above 80% — overall performance is strong.</li>}
              {summary.summary?.passRate < 60 && <li>Pass rate is below 60% — urgent intervention required.</li>}
              <li>Highest score: {summary.summary?.highestScore}% | Lowest score: {summary.summary?.lowestScore}%</li>
              <li>Total students tracked: {summary.summary?.totalStudents}</li>
            </ul>
          </div>

          {summary.subjectPerformances?.length > 0 && (
            <div className="dashboard-card chart-card" style={{ marginTop: 20 }}>
              <BarChart
                data={summary.subjectPerformances.slice(0, 8).map((s) => ({ label: s._id, value: parseFloat(s.avgScore.toFixed(1)) }))}
                xKey="label"
                yKey="value"
                title="Subject Performance Overview"
                color="#2e7d32"
              />
            </div>
          )}
        </div>
      )}

      {activeTab === 'grades' && gradeReport && (
        <div className="report-section">
          <div className="dashboard-grid">
            <div className="dashboard-card chart-card">
              <PieChart data={gradeChartData} labelKey="label" valueKey="value" title="Grade Distribution" />
            </div>
            <div className="dashboard-card">
              <h3 className="chart-title">Grade Breakdown</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Grade</th>
                    <th>Count</th>
                    <th>Avg Score</th>
                    <th>Distribution</th>
                  </tr>
                </thead>
                <tbody>
                  {gradeReport.distribution?.map((g) => (
                    <tr key={g.grade}>
                      <td><span className={`grade-badge grade-${g.grade?.toLowerCase()?.replace('+', 'p')}`}>{g.grade}</span></td>
                      <td>{g.count}</td>
                      <td>{g.avgScore}%</td>
                      <td>
                        <div className="bar-mini">
                          <div
                            className="bar-fill"
                            style={{
                              width: `${gradeReport.totalStudents > 0 ? (g.count / gradeReport.totalStudents) * 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'compare' && (
        <div className="report-section">
          <div className="compare-form">
            <p className="form-help">Enter student IDs (comma-separated) to compare performance.</p>
            <div className="compare-input-row">
              <input
                type="text"
                className="form-input"
                placeholder="e.g., STU2026001, STU2026002"
                value={compareIds}
                onChange={(e) => setCompareIds(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleCompare} disabled={compareLoading}>
                {compareLoading ? 'Loading...' : 'Compare'}
              </button>
            </div>
          </div>

          {comparison && comparison.length > 0 && (
            <div className="comparison-results">
              {comparison.map((c) => (
                <div key={c.student._id} className="comparison-card">
                  <h4>{c.student.name}</h4>
                  <p className="text-muted">{c.student.studentId} &bull; {c.student.course}</p>
                  <div className="comparison-stats">
                    <div className="stat-mini">
                      <span className="stat-mini-label">Avg Score</span>
                      <span className={`stat-mini-value ${c.averageScore >= 70 ? 'high' : c.averageScore >= 50 ? 'medium' : 'low'}`}>
                        {c.averageScore}%
                      </span>
                    </div>
                    <div className="stat-mini">
                      <span className="stat-mini-label">Records</span>
                      <span className="stat-mini-value">{c.totalRecords}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'subjects' && summary && (
        <div className="report-section">
          <div className="dashboard-card chart-card">
            <BarChart
              data={summary.subjectPerformances?.map((s) => ({ label: s._id, value: parseFloat(s.avgScore.toFixed(1)) })) || []}
              xKey="label"
              yKey="value"
              title="All Subjects Performance"
              color="#1a237e"
            />
          </div>
          <div className="dashboard-card" style={{ marginTop: 20 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Avg Score</th>
                  <th>Avg Attendance</th>
                  <th>Students</th>
                  <th>Pass Count</th>
                </tr>
              </thead>
              <tbody>
                {summary.subjectPerformances?.map((s) => (
                  <tr key={s._id}>
                    <td><strong>{s._id}</strong></td>
                    <td><span className={`score-badge ${s.avgScore >= 70 ? 'high' : s.avgScore >= 50 ? 'medium' : 'low'}`}>{s.avgScore.toFixed(1)}%</span></td>
                    <td>{s.avgAttendance.toFixed(1)}%</td>
                    <td>{s.studentCount}</td>
                    <td>{s.passCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
