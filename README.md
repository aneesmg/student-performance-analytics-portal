# Student Performance Analytics Portal (SPAP)

A full-stack MERN application for tracking, analyzing, and reporting student academic performance.

## Week 2 — Backend Foundation & Database Setup

This week transforms Week 1 architecture into a fully functional backend with MongoDB, Express APIs, and CRUD operations.

## Deliverables

| # | Deliverable | Status |
|---|-------------|--------|
| 1 | Node.js Project Setup | Done |
| 2 | Express Server Configuration | Done |
| 3 | MongoDB Database Setup | Done |
| 4 | Student Collection Schema | Done |
| 5 | REST APIs (CRUD) | Done |
| 6 | API Testing with Postman | Done |
| 7 | Organized Project Structure | Done |

## Tech Stack

- **Frontend:** React 18, React Router v6, Recharts, Axios
- **Backend:** Node.js, Express.js, Mongoose, JWT, bcryptjs
- **Database:** MongoDB
- **Security:** Helmet, CORS, Rate Limiting
- **Logging:** Morgan
- **Validation:** express-validator

## Project Structure

```
├── client/                          # React frontend
│   ├── public/
│   └── src/
│       ├── components/              # Navbar, Footer
│       ├── pages/                   # Home, About, Dashboard, Reports, Contact
│       ├── services/                # Axios API client
│       └── styles/                  # Global CSS
├── server/                          # Express backend
│   ├── config/                      # App & DB configuration
│   │   ├── index.js                 # Centralized config
│   │   └── db.js                    # DB connection settings
│   ├── controllers/                 # Route handlers
│   │   ├── authController.js        # Register, Login, Profile
│   │   ├── studentController.js     # CRUD + search/filter
│   │   ├── performanceController.js # CRUD + stats/aggregation
│   │   └── courseController.js      # CRUD
│   ├── middleware/                  # Express middleware
│   │   ├── auth.js                  # JWT verification
│   │   ├── roleAuth.js             # Role-based access
│   │   └── validate.js             # Request validation
│   ├── models/                      # Mongoose schemas
│   │   ├── User.js                  # User accounts
│   │   ├── Student.js               # Student records
│   │   ├── Performance.js           # Academic performance
│   │   └── Course.js                # Course catalog
│   ├── routes/                      # API route definitions
│   │   ├── auth.js                  # /api/auth/*
│   │   ├── students.js              # /api/students/*
│   │   ├── performance.js           # /api/performance/*
│   │   ├── reports.js               # /api/reports/*
│   │   └── courses.js               # /api/courses/*
│   ├── server.js                    # Entry point
│   ├── seed.js                      # Database seeder (100+ records)
│   └── SPAP_Postman_Collection.json # Postman test collection
└── docs/                            # Documentation
    ├── architecture/
    ├── api/
    │   ├── api-documentation.md      # Full API reference
    │   └── postman-testing-guide.md  # Postman setup guide
    ├── database/
    ├── roles/
    └── wireframes/
```

## API Endpoints

### Authentication
| Method | Endpoint        | Auth | Description      |
|--------|----------------|------|------------------|
| POST   | /api/auth/register | No | Register user   |
| POST   | /api/auth/login    | No | Login           |
| GET    | /api/auth/me       | Yes | Get profile    |

### Students
| Method | Endpoint             | Auth | Roles       | Description            |
|--------|---------------------|------|-------------|------------------------|
| GET    | /api/students       | Yes  | All         | List + search/filter   |
| GET    | /api/students/:id   | Yes  | All         | Get by ID or studentId |
| POST   | /api/students       | Yes  | Admin,Teacher | Create student      |
| PUT    | /api/students/:id   | Yes  | Admin,Teacher | Update student      |
| DELETE | /api/students/:id   | Yes  | Admin       | Delete student        |

### Performance
| Method | Endpoint                         | Auth | Description              |
|--------|---------------------------------|------|--------------------------|
| GET    | /api/performance                | Yes  | List + filter/sort       |
| GET    | /api/performance/stats          | Yes  | Aggregate statistics     |
| GET    | /api/performance/grade-distribution | Yes | Grade distribution     |
| GET    | /api/performance/:studentId     | Yes  | Student performances     |
| POST   | /api/performance                | Yes  | Create record            |
| PUT    | /api/performance/:id            | Yes  | Update record            |
| DELETE | /api/performance/:id            | Yes  | Delete record            |

### Courses
| Method | Endpoint          | Auth | Roles | Description      |
|--------|------------------|------|-------|------------------|
| GET    | /api/courses      | Yes  | All   | List courses     |
| GET    | /api/courses/:id  | Yes  | All   | Get course       |
| POST   | /api/courses      | Yes  | Admin | Create course    |
| PUT    | /api/courses/:id  | Yes  | Admin | Update course    |
| DELETE | /api/courses/:id  | Yes  | Admin | Delete course    |

### Reports
| Method | Endpoint               | Auth | Description          |
|--------|------------------------|------|----------------------|
| GET    | /api/reports/summary   | Yes  | Performance summary  |
| GET    | /api/reports/grades    | Yes  | Grade distribution   |

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
cd server
npm run dev
```

### Test with Postman

1. Import `server/SPAP_Postman_Collection.json` into Postman
2. Run Health Check → Login → CRUD operations
3. See `docs/api/postman-testing-guide.md` for details

## User Roles

| Role    | Access Level                              |
|---------|-------------------------------------------|
| Admin   | Full system access (manage users, delete) |
| Teacher | Manage students & grades, view reports    |
| Student | View personal performance only            |

### Default Login Credentials (Dev)

| Email                | Password    | Role    |
|---------------------|------------|---------|
| admin@spap.com      | admin123   | Admin   |
| teacher@spap.com    | teacher123 | Teacher |
| student@spap.com    | student123 | Student |

## Documentation

- [System Architecture](docs/architecture/architecture.md)
- [Database Schema](docs/database/database-schema.md)
- [API Documentation](docs/api/api-documentation.md)
- [Postman Testing Guide](docs/api/postman-testing-guide.md)
- [User Roles](docs/roles/user-roles.md)
- [Wireframes](docs/wireframes/wireframes.md)

## License

MIT © CODIORA
