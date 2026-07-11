import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { BookOpenIcon, UsersIcon, ClockIcon } from '../components/Icons';
import './RoleDashboards.css';

const TeacherCourses = () => {
  const courses = [
    { name: 'Data Structures', code: 'CS201', students: 32, schedule: 'Mon/Wed 10:00-11:30', room: 'Hall A', credits: 4, department: 'Computer Science' },
    { name: 'Algorithms', code: 'CS202', students: 28, schedule: 'Tue/Thu 14:00-15:30', room: 'Lab 3', credits: 4, department: 'Computer Science' },
    { name: 'Database Systems', code: 'CS203', students: 35, schedule: 'Mon/Wed 14:00-15:30', room: 'Hall B', credits: 3, department: 'Computer Science' },
    { name: 'Computer Networks', code: 'CS204', students: 33, schedule: 'Tue/Thu 10:00-11:30', room: 'Lab 1', credits: 3, department: 'Computer Science' },
  ];

  return (
    <DashboardLayout title="My Courses" subtitle="View your assigned courses and schedules">
      <div className="course-cards">
        {courses.map((c, i) => (
          <div className="card course-card" key={i}>
            <div className="course-card-header">
              <div className="course-card-icon">
                <BookOpenIcon size={24} color="#fff" />
              </div>
              <div>
                <h3 className="course-card-name">{c.name}</h3>
                <span className="course-card-code">{c.code}</span>
              </div>
            </div>
            <div className="course-card-body">
              <div className="course-card-detail">
                <UsersIcon size={16} color="#6b7280" />
                <span>{c.students} Students</span>
              </div>
              <div className="course-card-detail">
                <ClockIcon size={16} color="#6b7280" />
                <span>{c.schedule}</span>
              </div>
              <div className="course-card-detail">
                <span className="detail-icon">R</span>
                <span>Room: {c.room}</span>
              </div>
            </div>
            <div className="course-card-footer">
              <span className="course-tag">{c.department}</span>
              <span className="course-tag">{c.credits} Credits</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TeacherCourses;
