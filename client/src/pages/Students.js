import React, { useState, useEffect, useCallback } from 'react';
import { studentAPI } from '../services/api';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import ExportOptions from '../components/ExportOptions';

function Students() {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filterOptions, setFilterOptions] = useState({ courses: [], semesters: [], genders: [], enrollmentYears: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('-createdAt');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page, limit: 10, sort };
      if (search) params.search = search;
      Object.entries(filters).forEach(([k, v]) => {
        if (v) params[k] = v;
      });

      const res = await studentAPI.getAll(params);
      setStudents(res.data.data.students);
      setPagination(res.data.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load students');
    } finally {
      setLoading(false);
    }
  }, [page, search, filters, sort]);

  const fetchFilterOptions = useCallback(async () => {
    try {
      const res = await studentAPI.getFilterOptions();
      setFilterOptions(res.data.data);
    } catch { }
  }, []);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);
  useEffect(() => { fetchFilterOptions(); }, [fetchFilterOptions]);

  const handleSearch = (term) => { setSearch(term); setPage(1); };
  const handleFilterChange = (newFilters) => { setFilters(newFilters); setPage(1); };
  const handleClear = () => { setSearch(''); setFilters({}); setPage(1); };
  const handlePageChange = (p) => setPage(p);

  const filterConfigs = [
    { key: 'course', label: 'Course', options: filterOptions.courses || [] },
    { key: 'semester', label: 'Semester', options: (filterOptions.semesters || []).map(String) },
    { key: 'gender', label: 'Gender', options: filterOptions.genders || [] },
    { key: 'enrollmentYear', label: 'Year', options: (filterOptions.enrollmentYears || []).map(String) },
  ];

  if (selectedStudent) {
    return (
      <div className="page">
        <div className="page-header">
          <button className="btn btn-outline" onClick={() => setSelectedStudent(null)}>
            ← Back to Students
          </button>
        </div>
        <StudentDetail studentId={selectedStudent} onBack={() => setSelectedStudent(null)} />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Students</h1>
          <p className="page-subtitle">Manage and view all student records</p>
        </div>
        <ExportOptions type="students" filters={{ ...filters, search }} />
      </div>

      <SearchFilter
        searchPlaceholder="Search by name, ID, or email..."
        filters={filterConfigs}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onClear={handleClear}
      />

      {error && <div className="form-error-banner">{error}</div>}

      <div className="table-controls">
        <div className="sort-options">
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="name">Name (A-Z)</option>
            <option value="-name">Name (Z-A)</option>
            <option value="studentId">Student ID</option>
            <option value="semester">Semester</option>
          </select>
        </div>
        <span className="table-count">{pagination?.total || 0} students found</span>
      </div>

      {loading ? (
        <div className="table-loading"><div className="spinner"></div><p>Loading...</p></div>
      ) : students.length === 0 ? (
        <div className="table-empty">
          <p>No students found matching your criteria.</p>
          <button className="btn btn-outline" onClick={handleClear}>Clear Filters</button>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Gender</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id} className="table-row-clickable" onClick={() => setSelectedStudent(s._id)}>
                    <td><span className="mono">{s.studentId}</span></td>
                    <td><strong>{s.name}</strong></td>
                    <td className="text-muted">{s.email}</td>
                    <td><span className="badge">{s.course}</span></td>
                    <td>Sem {s.semester}</td>
                    <td>{s.gender}</td>
                    <td>{s.enrollmentYear}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={(e) => { e.stopPropagation(); setSelectedStudent(s._id); }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
}

function StudentDetail({ studentId, onBack }) {
  const [student, setStudent] = useState(null);
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await studentAPI.getById(studentId);
        setStudent(res.data.data.student);
        setPerformances(res.data.data.performances || []);
      } catch { }
      setLoading(false);
    };
    fetch();
  }, [studentId]);

  if (loading) return <div className="table-loading"><div className="spinner"></div></div>;
  if (!student) return <p>Student not found.</p>;

  return (
    <div className="student-detail">
      <div className="detail-card">
        <div className="detail-header">
          <div className="detail-avatar">{student.name?.charAt(0)}</div>
          <div>
            <h2>{student.name}</h2>
            <p className="text-muted">{student.studentId} &bull; {student.email}</p>
          </div>
        </div>
        <div className="detail-grid">
          <div><strong>Course:</strong> {student.course}</div>
          <div><strong>Semester:</strong> {student.semester}</div>
          <div><strong>Gender:</strong> {student.gender}</div>
          <div><strong>Enrollment:</strong> {student.enrollmentYear}</div>
          <div><strong>Phone:</strong> {student.phone || 'N/A'}</div>
          <div><strong>Guardian:</strong> {student.guardianName || 'N/A'}</div>
        </div>
      </div>

      <h3 style={{ marginTop: 24, marginBottom: 16 }}>Performance Records</h3>
      {performances.length === 0 ? (
        <p className="text-muted">No performance records found.</p>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Semester</th>
                <th>Attendance</th>
                <th>Assignment</th>
                <th>Quiz</th>
                <th>Mid</th>
                <th>Final</th>
                <th>Overall</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {performances.map((p) => (
                <tr key={p._id}>
                  <td>{p.course}</td>
                  <td>Sem {p.semester}</td>
                  <td>{p.attendance}%</td>
                  <td>{p.assignmentScore}</td>
                  <td>{p.quizScore}</td>
                  <td>{p.midExamScore}</td>
                  <td>{p.finalExamScore}</td>
                  <td><strong>{p.overallPercentage}%</strong></td>
                  <td><span className={`grade-badge grade-${p.grade?.toLowerCase()?.replace('+', 'p') || 'f'}`}>{p.grade}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Students;
