import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('spap_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('spap_token');
      localStorage.removeItem('spap_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const studentAPI = {
  getAll: (params) => api.get('/students', { params }),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
  getFilterOptions: () => api.get('/students/filter-options'),
};

export const performanceAPI = {
  getAll: (params) => api.get('/performance', { params }),
  getByStudent: (studentId) => api.get(`/performance/${studentId}`),
  getStats: () => api.get('/performance/stats'),
  getGradeDistribution: (params) => api.get('/performance/grade-distribution', { params }),
  create: (data) => api.post('/performance', data),
  update: (id, data) => api.put(`/performance/${id}`, data),
  delete: (id) => api.delete(`/performance/${id}`),
  getFilterOptions: () => api.get('/performance/filter-options'),
};

export const reportAPI = {
  getSummary: () => api.get('/reports/summary'),
  getGradeReport: (params) => api.get('/reports/grades', { params }),
  compareStudents: (ids) => api.get('/reports/compare', { params: { ids } }),
  exportCSV: (params) => api.get('/reports/export/csv', { params, responseType: 'blob' }),
  exportPDF: () => api.get('/reports/export/pdf'),
};

export const courseAPI = {
  getAll: (params) => api.get('/courses', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
  getDepartments: () => api.get('/courses/departments'),
};

export default api;
