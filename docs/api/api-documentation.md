# Student Performance Analytics Portal
## API Planning Document

### 1. API Overview

- **Base URL:** `http://localhost:5000/api`
- **Protocol:** HTTP/1.1
- **Format:** JSON
- **Auth:** JWT Bearer Token (x-auth-token header)
- **Version:** v1

### 2. Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "teacher"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "abc123", "name": "John Doe", "email": "john@example.com", "role": "teacher" }
}
```

#### POST /api/auth/login
Authenticate and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "abc123", "name": "John Doe", "email": "john@example.com", "role": "teacher" }
}
```

#### GET /api/auth/me
Get currently authenticated user profile. *(Auth Required)*

**Headers:** `x-auth-token: <token>`

**Response (200):**
```json
{
  "_id": "abc123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "teacher",
  "phone": "",
  "isActive": true
}
```

### 3. Student Endpoints

#### GET /api/students
Get all students with pagination. *(Auth Required)*

**Query Parameters:**
| Param    | Type   | Default | Description              |
|---------|--------|---------|--------------------------|
| page    | number | 1       | Page number              |
| limit   | number | 10      | Items per page           |
| search  | string | -       | Search by name           |
| course  | string | -       | Filter by course         |
| semester| number | -       | Filter by semester       |

**Response (200):**
```json
{
  "students": [{ "_id": "abc", "studentId": "STU001", "name": "Alice", ... }],
  "total": 100,
  "page": 1,
  "pages": 10
}
```

#### GET /api/students/:id
Get single student by ID. *(Auth Required)*

#### POST /api/students
Create new student record. *(Auth Required, Roles: admin, teacher)*

**Request Body:**
```json
{
  "studentId": "STU2026001",
  "name": "Alice Wonderland",
  "email": "alice@example.com",
  "course": "Computer Science",
  "semester": 3,
  "enrollmentYear": 2025,
  "dateOfBirth": "2005-03-15",
  "gender": "Female",
  "phone": "+1234567890",
  "address": "123 Main St",
  "guardianName": "Bob Wonderland",
  "guardianPhone": "+1987654321"
}
```

#### PUT /api/students/:id
Update student record. *(Auth Required, Roles: admin, teacher)*

#### DELETE /api/students/:id
Delete student and related performance records. *(Auth Required, Roles: admin)*

### 4. Performance Endpoints

#### GET /api/performance
Get all performance records. *(Auth Required)*

**Query Parameters:**
| Param    | Type   | Default | Description              |
|---------|--------|---------|--------------------------|
| page     | number | 1       | Page number              |
| limit    | number | 20      | Items per page           |
| course   | string | -       | Filter by course         |
| semester | number | -       | Filter by semester       |
| grade    | string | -       | Filter by grade          |

#### GET /api/performance/stats
Get aggregate performance statistics. *(Auth Required)*

**Response (200):**
```json
{
  "avgAttendance": 84.5,
  "avgAssignment": 76.2,
  "avgQuiz": 72.8,
  "avgMid": 70.5,
  "avgFinal": 74.1,
  "avgOverall": 74.8,
  "totalRecords": 500
}
```

#### GET /api/performance/grade-distribution
Get grade distribution data. *(Auth Required)*

**Response (200):**
```json
[
  { "_id": "A+", "count": 45 },
  { "_id": "A", "count": 78 },
  { "_id": "B+", "count": 92 },
  { "_id": "B", "count": 110 },
  { "_id": "C+", "count": 85 },
  { "_id": "C", "count": 52 },
  { "_id": "D", "count": 18 },
  { "_id": "F", "count": 6 }
]
```

#### GET /api/performance/:studentId
Get performance records for a specific student. *(Auth Required)*

#### POST /api/performance
Create performance record. *(Auth Required, Roles: admin, teacher)*

**Request Body:**
```json
{
  "student": "abc123",
  "course": "Computer Science",
  "semester": 3,
  "academicYear": "2025-2026",
  "attendance": 92,
  "assignmentScore": 88,
  "quizScore": 85,
  "midExamScore": 78,
  "finalExamScore": 90,
  "remarks": "Excellent performance"
}
```

**Response (201):**
```json
{
  "_id": "perf123",
  "student": "abc123",
  "course": "Computer Science",
  "semester": 3,
  "academicYear": "2025-2026",
  "attendance": 92,
  "assignmentScore": 88,
  "quizScore": 85,
  "midExamScore": 78,
  "finalExamScore": 90,
  "overallPercentage": 86.2,
  "grade": "A",
  "remarks": "Excellent performance"
}
```

#### PUT /api/performance/:id
Update performance record. *(Auth Required, Roles: admin, teacher)*

#### DELETE /api/performance/:id
Delete performance record. *(Auth Required, Roles: admin)*

### 5. Report Endpoints

#### GET /api/reports/summary
Get overall performance summary. *(Auth Required)*

#### GET /api/reports/grades
Get grade distribution for reports. *(Auth Required)*

### 6. Health Check

#### GET /api/health
Check server status.

**Response (200):**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 7. Error Response Format

```json
{
  "message": "Error description here"
}
```

**Validation Error (400):**
```json
{
  "errors": [
    { "msg": "Name is required", "param": "name", "location": "body" }
  ]
}
```

### 8. HTTP Status Codes

| Code | Description                |
|------|----------------------------|
| 200  | OK - Successful request    |
| 201  | Created - Resource created |
| 400  | Bad Request - Validation   |
| 401  | Unauthorized - No/invalid token |
| 403  | Forbidden - Insufficient role |
| 404  | Not Found - Resource missing |
| 500  | Internal Server Error      |

### 9. API Route Summary

| Method | Endpoint                          | Auth   | Roles         | Description              |
|--------|----------------------------------|--------|---------------|--------------------------|
| POST   | /api/auth/register               | No     | -             | Register user            |
| POST   | /api/auth/login                  | No     | -             | Login                    |
| GET    | /api/auth/me                     | Yes    | All           | Get profile              |
| GET    | /api/students                    | Yes    | All           | List students            |
| GET    | /api/students/:id               | Yes    | All           | Get student              |
| POST   | /api/students                    | Yes    | Admin,Teacher | Create student           |
| PUT    | /api/students/:id               | Yes    | Admin,Teacher | Update student           |
| DELETE | /api/students/:id               | Yes    | Admin         | Delete student           |
| GET    | /api/performance                 | Yes    | All           | List performances        |
| GET    | /api/performance/stats          | Yes    | All           | Performance stats        |
| GET    | /api/performance/grade-distribution | Yes | All         | Grade distribution       |
| GET    | /api/performance/:studentId     | Yes    | All           | Student performances     |
| POST   | /api/performance                 | Yes    | Admin,Teacher | Create performance       |
| PUT    | /api/performance/:id            | Yes    | Admin,Teacher | Update performance       |
| DELETE | /api/performance/:id            | Yes    | Admin         | Delete performance       |
| GET    | /api/reports/summary            | Yes    | All           | Report summary           |
| GET    | /api/reports/grades             | Yes    | All           | Grade report             |
| GET    | /api/health                     | No     | -             | Health check             |
