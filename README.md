# Student Performance Analytics Portal (SPAP)

A full-stack MERN application for tracking, analyzing, and reporting student academic performance with role-based dashboards, design system, and mobile app.

## Week 4 — Design System Enhancement & Mobile Integration

Complete UI/UX design system with reusable components, role-based dashboards, notification system, settings/preferences, dark/light theme, and a Flutter mobile app.

## Deliverables

| # | Deliverable | Status |
|---|-------------|--------|
| 1 | Admin Dashboard | Done |
| 2 | Teacher Dashboard | Done |
| 3 | Student Dashboard | Done |
| 4 | Notification & Alert System | Done |
| 5 | Settings & Profile Pages | Done |
| 6 | Reusable Components (Table, Form, Modal, Alert) | Done |
| 7 | Design Style Guide for Developers | Done |
| 8 | Role-Based Mobile Navigation (Flutter) | Done |
| 9 | Dark/Light Theme Support | Done |
| 10 | Performance Details Screen (Mobile) | Done |

## Tech Stack

- **Frontend:** React 18, React Router v6, Axios, CSS Variables
- **Backend:** Node.js, Express.js, Mongoose, JWT, bcryptjs
- **Database:** MongoDB
- **Mobile:** Flutter, Dart, Provider
- **Security:** Helmet, CORS
- **Logging:** Morgan
- **Validation:** express-validator

## Project Structure

```
├── client/                          # React frontend
│   ├── public/
│   └── src/
│       ├── components/              # DashboardLayout, Sidebar, Icons, Table,
│       │                           # FormField, Alert, Modal, NotificationBell,
│       │                           # PerformanceCard, Navbar, Footer
│       ├── context/                 # AuthContext, ThemeContext
│       ├── pages/                   # Admin/Teacher/Student dashboards,
│       │                           # Profile, Settings, Notifications,
│       │                           # StyleGuide, Grades, Attendance, etc.
│       ├── services/                # Axios API client
│       └── styles/                  # Global CSS with design tokens + dark mode
├── server/                          # Express backend
│   ├── config/                      # App & DB configuration
│   ├── controllers/                 # auth, student, performance, course,
│   │                               # notification, settings controllers
│   ├── middleware/                  # JWT auth, role-based access, validation
│   ├── models/                      # User, Student, Performance, Course,
│   │                               # Notification, Settings models
│   ├── routes/                      # /api/auth, /api/students, /api/performance,
│   │                               # /api/courses, /api/reports,
│   │                               # /api/notifications, /api/settings
│   ├── index.js                     # Server entry point
│   └── seed.js                      # Database seeder
├── mobile/                          # Flutter mobile app
│   └── lib/
│       ├── main.dart                # App entry with light/dark themes
│       ├── screens/                 # Login, Register, Home, Dashboard,
│       │                           # Profile, Notifications, PerformanceDetail
│       └── services/                # AuthService, ApiService, ThemeService
├── design-system/                   # Design system documentation
│   └── style-guide.md              # Complete design tokens & component guide
└── docs/                            # Documentation
    ├── architecture/
    ├── api/
    ├── database/
    ├── roles/
    └── wireframes/
```

## Features

### Role-Based Dashboards
- **Admin Dashboard** — System-wide stats, recent registrations, system metrics
- **Teacher Dashboard** — Class stats, course performance, activity feed
- **Student Dashboard** — GPA, attendance, grades, performance overview

### Design System
- 30+ SVG icons in `Icons.js`
- Reusable components: Table, FormField, Alert, Modal, NotificationBell
- CSS variables for colors, spacing, typography
- Dark/Light theme with toggle

### Notifications & Alerts
- Auto-dismiss alerts (success/error/warning/info)
- Notification center with mark read/delete
- Unread count indicator

### User Management
- Profile editing (name, phone)
- Password change
- Preferences (theme, notification toggles)

### Mobile App (Flutter)
- Role-based bottom navigation
- Notifications screen
- Performance details screen
- Dark/light theme switching
- Edit profile & change password

## API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login |
| GET | /api/auth/me | Yes | Get profile |

### Students
| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| GET | /api/students | Yes | All | List + search/filter |
| GET | /api/students/:id | Yes | All | Get by ID or studentId |
| POST | /api/students | Yes | Admin,Teacher | Create student |
| PUT | /api/students/:id | Yes | Admin,Teacher | Update student |
| DELETE | /api/students/:id | Yes | Admin | Delete student |

### Performance
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/performance | Yes | List + filter/sort |
| GET | /api/performance/stats | Yes | Aggregate statistics |
| GET | /api/performance/grade-distribution | Yes | Grade distribution |
| GET | /api/performance/:studentId | Yes | Student performances |
| POST | /api/performance | Yes | Create record |
| PUT | /api/performance/:id | Yes | Update record |
| DELETE | /api/performance/:id | Yes | Delete record |

### Notifications
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/notifications | Yes | List notifications |
| PUT | /api/notifications/:id/read | Yes | Mark as read |
| PUT | /api/notifications/read-all | Yes | Mark all read |
| DELETE | /api/notifications/:id | Yes | Delete notification |

### Settings
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/settings | Yes | Get user settings |
| PUT | /api/settings | Yes | Update settings |
| PUT | /api/settings/profile | Yes | Update profile |
| PUT | /api/settings/change-password | Yes | Change password |

### Courses
| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| GET | /api/courses | Yes | All | List courses |
| GET | /api/courses/:id | Yes | All | Get course |
| POST | /api/courses | Yes | Admin | Create course |
| PUT | /api/courses/:id | Yes | Admin | Update course |
| DELETE | /api/courses/:id | Yes | Admin | Delete course |

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB v7+ (local or Atlas)
- npm v9+

### Installation

```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### Seed Database

```bash
cd server
npm run seed
```

### Development

```bash
# From root - runs both client and server
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Default Login Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@spap.com | admin123 | Admin |
| teacher@spap.com | teacher123 | Teacher |
| student@spap.com | student123 | Student |

## User Roles

| Role | Access Level |
|------|-------------|
| Admin | Full system access (manage users, courses, delete) |
| Teacher | Manage students & grades, view reports |
| Student | View personal grades, attendance, performance |

## Documentation

- [System Architecture](docs/architecture/architecture.md)
- [Database Schema](docs/database/database-schema.md)
- [API Documentation](docs/api/api-documentation.md)
- [Design System](design-system/style-guide.md)
- [User Roles](docs/roles/user-roles.md)
- [Wireframes](docs/wireframes/wireframes.md)

## License

MIT © CODIORA
