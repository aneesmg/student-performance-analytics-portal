import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import StudentDashboard from './pages/StudentDashboard';
import StudentGrades from './pages/StudentGrades';
import StudentAttendance from './pages/StudentAttendance';

import TeacherDashboard from './pages/TeacherDashboard';
import TeacherStudents from './pages/TeacherStudents';
import TeacherGrades from './pages/TeacherGrades';
import TeacherCourses from './pages/TeacherCourses';

import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';

import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import StyleGuide from './pages/StyleGuide';

const RoleRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={`/${user.role}/dashboard`} replace />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/dashboard" element={<RoleRedirect />} />

          <Route path="/student/dashboard" element={<ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/grades" element={<ProtectedRoute roles={['student']}><StudentGrades /></ProtectedRoute>} />
          <Route path="/student/attendance" element={<ProtectedRoute roles={['student']}><StudentAttendance /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute roles={['student']}><Profile /></ProtectedRoute>} />
          <Route path="/student/settings" element={<ProtectedRoute roles={['student']}><Settings /></ProtectedRoute>} />
          <Route path="/student/notifications" element={<ProtectedRoute roles={['student']}><Notifications /></ProtectedRoute>} />

          <Route path="/teacher/dashboard" element={<ProtectedRoute roles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
          <Route path="/teacher/students" element={<ProtectedRoute roles={['teacher']}><TeacherStudents /></ProtectedRoute>} />
          <Route path="/teacher/grades" element={<ProtectedRoute roles={['teacher']}><TeacherGrades /></ProtectedRoute>} />
          <Route path="/teacher/courses" element={<ProtectedRoute roles={['teacher']}><TeacherCourses /></ProtectedRoute>} />
          <Route path="/teacher/profile" element={<ProtectedRoute roles={['teacher']}><Profile /></ProtectedRoute>} />
          <Route path="/teacher/settings" element={<ProtectedRoute roles={['teacher']}><Settings /></ProtectedRoute>} />
          <Route path="/teacher/notifications" element={<ProtectedRoute roles={['teacher']}><Notifications /></ProtectedRoute>} />

          <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute roles={['admin']}><AdminCourses /></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute roles={['admin']}><TeacherStudents /></ProtectedRoute>} />
          <Route path="/admin/grades" element={<ProtectedRoute roles={['admin']}><StudentGrades /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute roles={['admin']}><Profile /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute roles={['admin']}><Settings /></ProtectedRoute>} />
          <Route path="/admin/notifications" element={<ProtectedRoute roles={['admin']}><Notifications /></ProtectedRoute>} />

          <Route path="/style-guide" element={<ProtectedRoute><StyleGuide /></ProtectedRoute>} />

          <Route path="*" element={<RoleRedirect />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
