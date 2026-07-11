import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { EditIcon, CheckCircleIcon } from '../components/Icons';
import './RoleDashboards.css';

const TeacherGrades = () => {
  const [selectedCourse, setSelectedCourse] = useState('CS201');
  const [selectedExam, setSelectedExam] = useState('midterm');
  const [editMode, setEditMode] = useState(false);

  const courses = [
    { code: 'CS201', name: 'Data Structures' },
    { code: 'CS202', name: 'Algorithms' },
    { code: 'CS203', name: 'Database Systems' },
    { code: 'CS204', name: 'Computer Networks' },
  ];

  const gradeData = {
    CS201: {
      midterm: [
        { id: 'STU001', name: 'Ayesha Khan', score: 85, grade: 'A' },
        { id: 'STU002', name: 'Bilal Ahmed', score: 72, grade: 'B' },
        { id: 'STU003', name: 'Hassan Ali', score: 68, grade: 'C+' },
        { id: 'STU006', name: 'Usman Sheikh', score: 78, grade: 'B+' },
        { id: 'STU009', name: 'Zainab Shah', score: 91, grade: 'A+' },
      ],
      final: [
        { id: 'STU001', name: 'Ayesha Khan', score: 90, grade: 'A' },
        { id: 'STU002', name: 'Bilal Ahmed', score: 76, grade: 'B+' },
        { id: 'STU003', name: 'Hassan Ali', score: 71, grade: 'B' },
        { id: 'STU006', name: 'Usman Sheikh', score: 84, grade: 'A-' },
        { id: 'STU009', name: 'Zainab Shah', score: 95, grade: 'A+' },
      ],
    },
  };

  const grades = gradeData[selectedCourse]?.[selectedExam] || [];

  const handleSave = () => setEditMode(false);

  return (
    <DashboardLayout title="Manage Grades" subtitle="Enter and update student grades for your courses">
      <div className="card-controls-bar">
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="filter-select-md">
          {courses.map((c) => <option key={c.code} value={c.code}>{c.name} ({c.code})</option>)}
        </select>
        <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} className="filter-select-md">
          <option value="midterm">Midterm Exam</option>
          <option value="final">Final Exam</option>
          <option value="quiz">Quiz</option>
          <option value="assignment">Assignment</option>
        </select>
        {editMode ? (
          <button className="btn btn-primary btn-sm" onClick={handleSave}>
            <CheckCircleIcon size={16} color="#fff" /> Save Changes
          </button>
        ) : (
          <button className="btn btn-outline btn-sm" onClick={() => setEditMode(true)}>
            <EditIcon size={16} color="var(--primary)" /> Edit Grades
          </button>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Grade Entry - {courses.find((c) => c.code === selectedCourse)?.name} ({selectedExam})</h3>
          <span className="card-badge">{grades.length} students</span>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Score</th>
                <th>Grade</th>
                {editMode && <th>New Score</th>}
              </tr>
            </thead>
            <tbody>
              {grades.map((s, i) => (
                <tr key={i}>
                  <td className="cell-code">{s.id}</td>
                  <td className="cell-primary">{s.name}</td>
                  <td><span className="score-value">{s.score}%</span></td>
                  <td><span className={`grade-badge grade-${(s.grade || 'N')[0]?.toLowerCase() || 'n'}`}>{s.grade}</span></td>
                  {editMode && (
                    <td>
                      <input type="number" className="grade-input" defaultValue={s.score} min="0" max="100" />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherGrades;
