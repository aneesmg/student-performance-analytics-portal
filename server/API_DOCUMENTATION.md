# SPAP API Documentation v3.0.0

## Base URL
`http://localhost:5000/api`

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Structure
All API responses follow a consistent format:
```json
{
  "success": true|false,
  "message": "Human-readable message",
  "data": { ... },
  "errors": []  // Only on validation errors
}
```

Paginated responses include:
```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## Authentication

### POST /auth/register
Register a new user.
**Body:** `{ name, email, password, role? }`
**Roles allowed:** None (public)

### POST /auth/login
Login with credentials.
**Body:** `{ email, password }`
**Response:** `{ user, token }`

### GET /auth/me
Get current authenticated user profile.
**Auth:** Required

### PUT /auth/profile
Update user profile.
**Body:** `{ name?, avatar? }`
**Auth:** Required

---

## Students

### GET /students
List students with search, filter, and pagination.
**Query params:**
- `page` (default: 1)
- `limit` (default: 10, max: 100)
- `search` - Search by name, studentId, or email (regex)
- `course` - Filter by course
- `semester` - Filter by semester
- `gender` - Filter by gender
- `enrollmentYear` - Filter by enrollment year
- `sort` - Sort field (name, -name, createdAt, -createdAt, studentId, semester)

### GET /students/filter-options
Get available filter options (courses, semesters, genders, enrollmentYears).

### GET /students/:id
Get student by MongoDB ID or studentId (e.g., STU2026001).
Includes performance records.

### POST /students
Create a new student.
**Auth:** Admin, Teacher
**Body:** `{ studentId, name, email, dateOfBirth, gender, course, semester, enrollmentYear, ... }`

### PUT /students/:id
Update student record.
**Auth:** Admin, Teacher

### DELETE /students/:id
Delete student and associated performance records.
**Auth:** Admin

---

## Performance

### GET /performance
List performance records with search, filter, pagination.
**Query params:**
- `page`, `limit`, `sort`
- `search` - Search by student name/ID
- `course`, `semester`, `grade`
- `minScore`, `maxScore` - Filter by overall percentage range

### GET /performance/stats
Get aggregate statistics (average score, attendance, pass/fail counts, grade distribution).

### GET /performance/grade-distribution
Get grade distribution with optional filters.
**Query params:** `course`, `semester`

### GET /performance/filter-options
Get available filter options.

### GET /performance/:studentId
Get performance records for a specific student.

### POST /performance
Create performance record.
**Auth:** Admin, Teacher
**Body:** `{ student, course, semester, academicYear, attendance, assignmentScore, quizScore, midExamScore, finalExamScore }`

### PUT /performance/:id
Update performance record.
**Auth:** Admin, Teacher

### DELETE /performance/:id
Delete performance record.
**Auth:** Admin

---

## Courses

### GET /courses
List courses with search, filter, pagination.
**Query params:** `page`, `limit`, `search`, `department`, `sort`

### GET /courses/departments
Get list of distinct departments.

### GET /courses/:id
Get course by ID or courseCode.

### POST /courses
Create course.
**Auth:** Admin
**Body:** `{ courseCode, courseName, credits, department, instructor, semester }`

### PUT /courses/:id
Update course.
**Auth:** Admin

### DELETE /courses/:id
Delete course.
**Auth:** Admin

---

## Reports

### GET /reports/summary
Get overall performance summary with subject-wise breakdown and key insights.

### GET /reports/grades
Get grade distribution report.
**Query params:** `course`, `semester`

### GET /reports/compare?ids=ID1,ID2
Compare multiple students by their IDs (comma-separated).

### GET /reports/export/csv?type=students|performances
Export data as CSV file download.
**Query params:**
- `type`: "students" or "performances"
- `course`, `semester` (optional filters)

### GET /reports/export/pdf
Generate and download performance report as JSON file.

---

## System

### GET /api/health
Health check endpoint.

---

## Error Codes
| Status | Description |
|--------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Validation error / Bad request |
| 401 | Unauthorized / Invalid token |
| 403 | Forbidden (role not authorized) |
| 404 | Resource not found |
| 409 | Duplicate value |
| 500 | Internal server error |
