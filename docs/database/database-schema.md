# Student Performance Analytics Portal
## Database Planning Document

### 1. Database Technology

**MongoDB** (NoSQL Document Database)
- Version: 7.0+
- Driver: Mongoose 7.x ODM
- Database Name: `student_performance`

### 2. Entity-Relationship Overview

```
User ────┐
          ├── creates/maintains ── Student ────┐
          │                                     │
          └── views ── Performance ◄────────────┘
                            │
                            └── belongs to ── Course
```

### 3. Collection: users

```javascript
{
  _id: ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },           // bcrypt hashed
  role: { type: String, enum: ['admin', 'teacher', 'student'], default: 'student' },
  phone: { type: String },
  avatar: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}

Indexes:
- { email: 1 }                   (unique)
- { role: 1 }                    (for role-based queries)
```

### 4. Collection: students

```javascript
{
  _id: ObjectId,
  studentId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  phone: { type: String },
  address: { type: String },
  course: { type: String, required: true, index: true },
  semester: { type: Number, required: true, min: 1 },
  enrollmentYear: { type: Number, required: true },
  guardianName: { type: String },
  guardianPhone: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date },
  updatedAt: { type: Date }
}

Indexes:
- { studentId: 1 }              (unique)
- { email: 1 }                  (unique)
- { course: 1 }                 (for course filtering)
- { semester: 1, course: 1 }    (compound, for reports)
```

### 5. Collection: performances

```javascript
{
  _id: ObjectId,
  student: { type: ObjectId, ref: 'Student', required: true, index: true },
  course: { type: String, required: true },
  semester: { type: Number, required: true },
  academicYear: { type: String, required: true },         // e.g. "2025-2026"
  attendance: { type: Number, min: 0, max: 100, default: 0 },
  assignmentScore: { type: Number, min: 0, max: 100, default: 0 },
  quizScore: { type: Number, min: 0, max: 100, default: 0 },
  midExamScore: { type: Number, min: 0, max: 100, default: 0 },
  finalExamScore: { type: Number, min: 0, max: 100, default: 0 },
  overallPercentage: { type: Number, min: 0, max: 100 },
  grade: {
    type: String,
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'],
    index: true
  },
  remarks: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date }
}

Indexes:
- { student: 1 }                (for student lookup)
- { grade: 1 }                  (for grade distribution)
- { course: 1, semester: 1 }    (for course reports)
- { overallPercentage: -1 }     (for ranking)

Calculated Fields (pre-save hook):
  overallPercentage = attendance*0.10 + assignmentScore*0.20
                    + quizScore*0.15 + midExamScore*0.25
                    + finalExamScore*0.30

Grade Mapping:
  >= 90  → A+     >= 80  → A     >= 70  → B+
  >= 60  → B      >= 50  → C+    >= 40  → C
  >= 33  → D      < 33   → F
```

### 6. Collection: courses

```javascript
{
  _id: ObjectId,
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  credits: { type: Number, required: true, min: 1 },
  department: { type: String, required: true },
  instructor: { type: String },
  semester: { type: Number, required: true },
  description: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date }
}

Indexes:
- { courseCode: 1 }             (unique)
- { department: 1 }             (for department filtering)
```

### 7. Weightage Distribution for Performance Calculation

| Component        | Weightage |
|-----------------|-----------|
| Attendance       | 10%       |
| Assignment Score | 20%       |
| Quiz Score       | 15%       |
| Mid Exam Score   | 25%       |
| Final Exam Score | 30%       |
| **Total**        | **100%**  |

### 8. Data Relationships

| From        | To           | Type        | Field       |
|------------|-------------|------------|------------|
| Performance | Student     | Many-to-One | student    |
| Student     | Performance | One-to-Many | (ref in Performance) |
| Performance | Course      | Many-to-One | courseName |

### 9. Sample Data

**Student Record:**
```json
{
  "studentId": "STU2026001",
  "name": "Alice Wonderland",
  "email": "alice@example.com",
  "course": "Computer Science",
  "semester": 3,
  "enrollmentYear": 2025
}
```

**Performance Record:**
```json
{
  "student": "ObjectId(abc123)",
  "course": "Computer Science",
  "semester": 3,
  "academicYear": "2025-2026",
  "attendance": 92,
  "assignmentScore": 88,
  "quizScore": 85,
  "midExamScore": 78,
  "finalExamScore": 90,
  "overallPercentage": 86.2,
  "grade": "A"
}
```

### 10. Backup & Maintenance

- Daily automated backups using mongodump
- Index rebuild planned quarterly
- Data retention: 5 years of academic records
- Archive old records (>3 years) to cold storage
