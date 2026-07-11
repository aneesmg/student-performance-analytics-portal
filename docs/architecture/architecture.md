# Student Performance Analytics Portal
## System Architecture Document

### 1. System Overview

The Student Performance Analytics Portal (SPAP) is a full-stack MERN application designed to help educational institutions track, analyze, and report on student academic performance.

### 2. Architecture Pattern

**Three-Tier Client-Server Architecture**

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │   React SPA  │  │  Recharts    │  │  Axios HTTP   │  │
│  │   (UI/UX)    │  │  (Charts)    │  │  (API Client) │  │
│  └──────┬───────┘  └──────────────┘  └───────┬───────┘  │
│         │                                      │         │
└─────────┼──────────────────────────────────────┼─────────┘
          │           HTTP/JSON (REST API)        │
┌─────────┼──────────────────────────────────────┼─────────┐
│         ▼                                      ▼         │
│  ┌──────────────────────────────────────────────────┐    │
│  │              API Layer (Express.js)               │    │
│  │  ┌───────────┐ ┌──────────┐ ┌────────────────┐  │    │
│  │  │  Routes    │ │  Auth    │ │  Middleware     │  │    │
│  │  │           │ │  JWT     │ │  Validation     │  │    │
│  │  └─────┬─────┘ └──────────┘ └────────────────┘  │    │
│  │        ▼                                         │    │
│  │  ┌──────────────────────────────────────────┐    │    │
│  │  │          Controllers                      │    │    │
│  │  │  (Business Logic / Request Handling)      │    │    │
│  │  └──────────────────────────────────────────┘    │    │
│  └──────────────────────┬───────────────────────────┘    │
│                         │                                │
│         Server Layer    │                                │
└─────────────────────────┼────────────────────────────────┘
                          │
┌─────────────────────────┼────────────────────────────────┐
│                         ▼                                │
│  ┌──────────────────────────────────────────┐            │
│  │          Data Layer (MongoDB)             │            │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ │            │
│  │  │  Users   │ │ Students │ │Performanc│ │            │
│  │  │  Collection │ Collection│ │ Collection│ │            │
│  │  └──────────┘ └──────────┘ └──────────┘ │            │
│  │  ┌──────────┐ ┌──────────┐              │            │
│  │  │ Courses  │ │  Grades  │              │            │
│  │  │ Collection│ │ Collection│             │            │
│  │  └──────────┘ └──────────┘              │            │
│  └──────────────────────────────────────────┘            │
│         Database Layer                                    │
└──────────────────────────────────────────────────────────┘
```

### 3. Component Architecture

**Frontend (React.js)**
- Pages: Home, About, Dashboard, Reports, Contact
- Components: Navbar, Footer, StatCard, DataTable, GradeChart
- Services: API client with Axios, Auth service
- Utils: Formatters, validators, constants

**Backend (Express.js + Node.js)**
- Routes: auth, students, performance, reports
- Controllers: Business logic for each resource
- Models: Mongoose schemas for MongoDB
- Middleware: JWT auth, role-based access, validation

**Database (MongoDB)**
- Collections: users, students, performances, courses
- Relationships: Student -> Performance (one-to-many)
- Indexes: studentId, email, course, grade

### 4. Data Flow

```
User Action → React Component → API Service → Express Route
    → Auth Middleware → Controller → Mongoose Model → MongoDB
    → JSON Response → React State → UI Update
```

### 5. Technology Stack

| Layer       | Technology      | Purpose                        |
|------------|-----------------|--------------------------------|
| Frontend   | React 18        | UI Component Library           |
| Frontend   | React Router v6 | Client-side Routing            |
| Frontend   | Axios           | HTTP Client                    |
| Frontend   | Recharts        | Data Visualization             |
| Backend    | Node.js         | Runtime Environment            |
| Backend    | Express.js      | Web Framework                  |
| Backend    | Mongoose        | MongoDB ODM                    |
| Backend    | JWT             | Authentication                 |
| Backend    | bcryptjs        | Password Hashing               |
| Database   | MongoDB         | NoSQL Database                 |
| Dev Tools  | Nodemon         | Development Auto-restart       |

### 6. Security Architecture

- Authentication: JWT-based token authentication
- Authorization: Role-based access control (admin, teacher, student)
- Input Validation: express-validator middleware
- Password Security: bcryptjs hashing (10 salt rounds)
- API Protection: CORS configured for frontend origin
- Environment Variables: Sensitive data via .env

### 7. Scalability Considerations

- Stateless API server (horizontal scaling ready)
- MongoDB indexing on frequently queried fields
- Pagination on all list endpoints
- Separate read/write concerns planned for Phase 2
- Caching layer (Redis) planned for Phase 3
