# Student Performance Analytics Portal (SPAP)

A full-stack MERN application for tracking, analyzing, and reporting student academic performance.

## Week 5 — Advanced Dashboards, Data Management & Reporting

Role-based dashboards with interactive charts, advanced search/filter/pagination, data export (CSV/PDF), real-time notifications, and comprehensive error handling.

## Deliverables

| # | Deliverable | Status |
|---|-------------|--------|
| 1 | Advanced Search & Filter System | Done |
| 2 | Pagination for Student Records | Done |
| 3 | Export Features (CSV/PDF) | Done |
| 4 | Interactive Charts (Canvas-based) | Done |
| 5 | Notification & Activity Widgets | Done |
| 6 | Form Validation & Error Handling | Done |
| 7 | Role-Based Dashboards (Admin/Teacher/Student) | Done |
| 8 | Search/Filter/Pagination APIs | Done |
| 9 | Report Export APIs (CSV/PDF) | Done |
| 10 | Error Handling & Logging Middleware | Done |
| 11 | API Documentation & Postman Collection | Done |
| 12 | Data Analysis Scripts (Python/Matplotlib) | Done |
| 13 | Mobile App Scaffold (Flutter) | In Progress |

## Tech Stack

- **Frontend:** React 18, React Router v6, Canvas API (charts), Axios
- **Backend:** Node.js, Express.js, Mongoose, JWT, bcryptjs
- **Database:** MongoDB
- **Security:** Helmet, CORS
- **Logging:** Morgan, Custom Logger
- **Validation:** express-validator
- **Analysis:** Python, Pandas, Matplotlib
- **Mobile:** Flutter, Dart

## Project Structure

```
├── client/                          # React frontend
│   ├── public/
│   └── src/
│       ├── components/              # Charts, SearchFilter, Pagination, ExportOptions,
│       │                           # NotificationWidget, RecentActivity, Navbar, Footer
│       ├── pages/                   # Dashboard, Students, Reports, Login, Register, Profile
│       ├── services/                # Axios API client (auth, student, performance, report, course)
│       ├── context/                 # AuthContext (JWT-based auth)
│       └── styles/                  # Global CSS, dashboard.css
├── server/                          # Express backend
│   ├── controllers/                 # authController, studentController,
│   │                               # performanceController, courseController, reportController
│   ├── middleware/                  # auth (JWT), roleAuth, validate, errorHandler, logger
│   ├── models/                      # User, Student, Performance, Course
│   ├── routes/                      # auth, students, performance, reports, courses
│   ├── server.js                    # Entry point
│   ├── seed.js                      # Database seeder (users, 40+ courses, 100 students)
│   ├── API_DOCUMENTATION.md         # Full API reference
│   └── SPAP_Postman_Collection.json # Postman test collection
├── analysis/                        # Python analysis scripts
│   └── analyze.py                   # Subject analysis, grade distribution, trends, reports
├── design-system/                   # Design tokens, components, screens documentation
└── mobile/                          # Flutter mobile app (pubspec.yaml scaffold)
```

## API Endpoints

### Authentication
| Method | Endpoint        | Auth | Description      |
|--------|----------------|------|------------------|
| POST   | /api/auth/register | No | Register user   |
| POST   | /api/auth/login    | No | Login           |
| GET    | /api/auth/me       | Yes | Get profile    |

### Students
| Method | Endpoint                    | Auth | Roles       | Description                  |
|--------|----------------------------|------|-------------|------------------------------|
| GET    | /api/students              | Yes  | All         | List + search/filter/paginate|
| GET    | /api/students/filter-options| Yes  | All         | Get filter dropdown options  |
| GET    | /api/students/:id          | Yes  | All         | Get by ID or studentId       |
| POST   | /api/students              | Yes  | Admin,Teacher | Create student            |
| PUT    | /api/students/:id          | Yes  | Admin,Teacher | Update student            |
| DELETE | /api/students/:id          | Yes  | Admin       | Delete student               |

### Performance
| Method | Endpoint                          | Auth | Description                    |
|--------|----------------------------------|------|--------------------------------|
| GET    | /api/performance                 | Yes  | List + search/filter/paginate  |
| GET    | /api/performance/stats           | Yes  | Aggregate statistics           |
| GET    | /api/performance/grade-distribution| Yes | Grade distribution           |
| GET    | /api/performance/filter-options  | Yes  | Get filter dropdown options    |
| GET    | /api/performance/:studentId      | Yes  | Student performances           |
| POST   | /api/performance                 | Yes  | Create record                  |
| PUT    | /api/performance/:id             | Yes  | Update record                  |
| DELETE | /api/performance/:id             | Yes  | Delete record                  |

### Courses
| Method | Endpoint             | Auth | Roles | Description          |
|--------|---------------------|------|-------|----------------------|
| GET    | /api/courses         | Yes  | All   | List + search/filter/paginate |
| GET    | /api/courses/departments | Yes | All | Get departments     |
| GET    | /api/courses/:id     | Yes  | All   | Get course           |
| POST   | /api/courses         | Yes  | Admin | Create course        |
| PUT    | /api/courses/:id     | Yes  | Admin | Update course        |
| DELETE | /api/courses/:id     | Yes  | Admin | Delete course        |

### Reports
| Method | Endpoint                   | Auth | Description                    |
|--------|---------------------------|------|--------------------------------|
| GET    | /api/reports/summary      | Yes  | Performance summary + insights |
| GET    | /api/reports/grades       | Yes  | Grade distribution + breakdown |
| GET    | /api/reports/compare      | Yes  | Compare students by IDs        |
| GET    | /api/reports/export/csv   | Yes  | Export as CSV (students/performances) |
| GET    | /api/reports/export/pdf   | Yes  | Export comprehensive report    |

### System
| Method | Endpoint       | Auth | Description    |
|--------|---------------|------|----------------|
| GET    | /api/health   | No   | Health check   |

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB v7+ (local or Atlas)
- npm v9+

### Installation

```bash
# From root directory
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### Environment Setup

Create `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student_performance
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

### Seed Database

```bash
cd server
npm run seed
```

### Development

```bash
# Run both client and server concurrently (from root)
npm start

# Or run individually:
cd server && npm run dev    # Backend on :5000
cd client && npm start      # Frontend on :3000
```

### Test with Postman

1. Import `server/SPAP_Postman_Collection.json` into Postman
2. Run Health Check → Login → CRUD operations
3. See `server/API_DOCUMENTATION.md` for full API reference

## User Roles

| Role    | Dashboard           | Students | Reports | Profile |
|---------|---------------------|----------|---------|---------|
| Admin   | Full system stats   | Full CRUD access | All reports + export | View/Edit |
| Teacher | Class performance   | View + manage     | All reports + export | View/Edit |
| Student | Personal performance| Restricted        | Restricted          | View/Edit |

### Default Login Credentials (Dev)

| Email                | Password    | Role    |
|---------------------|------------|---------|
| admin@spap.com      | admin123   | Admin   |
| teacher@spap.com    | teacher123 | Teacher |
| student@spap.com    | student123 | Student |

## Documentation

- [API Documentation](server/API_DOCUMENTATION.md)
- [Design System](design-system/design-system.md)

## License

MIT © CODIORA
