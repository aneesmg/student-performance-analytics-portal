# Student Performance Analytics Portal
## User Roles & Permissions Document

### 1. Role Overview

| Role      | Description                                      | Priority |
|-----------|--------------------------------------------------|----------|
| Admin     | Full system access, user management, config       | Level 1  |
| Teacher   | Manage students, grades, view reports             | Level 2  |
| Student   | View personal performance, attendance, grades     | Level 3  |

### 2. Admin Role

**Access Level:** Full System Access

**Permissions:**
- Manage all user accounts (create, edit, delete)
- Configure system settings
- View all student records
- View all performance data
- Generate system-wide reports
- Manage courses and departments
- Access audit logs
- Manage roles and permissions
- Export all data
- Delete records

**UI Access:**
- All pages and sections
- Admin-specific settings panel
- User management dashboard

### 3. Teacher Role

**Access Level:** Instructional Access

**Permissions:**
- View assigned students
- Create and update student records
- Enter and edit performance scores
- Generate class reports
- View grade distributions
- View attendance records
- Add remarks and feedback
- Export class data
- Cannot delete student records
- Cannot manage users

**UI Access:**
- Dashboard (class view)
- Reports (class/course level)
- Student entry forms
- No admin settings access

### 4. Student Role

**Access Level:** Personal Access Only

**Permissions:**
- View personal profile
- View own performance records
- View own attendance
- View own grades
- View own report cards
- Update personal contact info
- Cannot view other students' data
- Cannot modify grades or scores

**UI Access:**
- Personal dashboard
- Own performance reports
- Profile settings
- No admin/teacher features

### 5. Permission Matrix

| Feature                  | Admin | Teacher | Student |
|-------------------------|-------|---------|---------|
| Manage Users            | Yes   | No      | No      |
| Add Students            | Yes   | Yes     | No      |
| Edit Students           | Yes   | Yes     | No*     |
| Delete Students         | Yes   | No      | No      |
| View All Students       | Yes   | Yes**   | No      |
| Enter Scores            | Yes   | Yes     | No      |
| Edit Scores             | Yes   | Yes     | No      |
| Delete Scores           | Yes   | No      | No      |
| View Own Performance    | Yes   | Yes     | Yes     |
| View Class Reports      | Yes   | Yes     | No      |
| View System Reports     | Yes   | No      | No      |
| Export Data             | Yes   | Yes***  | No      |
| Manage Courses          | Yes   | No      | No      |
| System Configuration    | Yes   | No      | No      |

* Students can edit limited profile fields (phone, address)
** Teachers see only their assigned students
*** Teachers export only their class data

### 6. Authentication Flow

```
Login → Email/Password → Validate Credentials → Generate JWT
  ↓
Decode JWT → Extract Role → Authorize Request
  ↓
Role Middleware → Allow/Deny Access
```

### 7. Route Protection

```javascript
// Admin-only route
router.delete('/students/:id', auth, roleAuth('admin'), studentController.deleteStudent);

// Admin/Teacher route
router.post('/students', auth, roleAuth('admin', 'teacher'), studentController.createStudent);

// Any authenticated user
router.get('/students', auth, studentController.getAllStudents);

// Self-only (checked in controller)
router.get('/me', auth, userController.getProfile);
```

### 8. Default Accounts (Development)

| Email                | Password  | Role      |
|---------------------|-----------|-----------|
| admin@spap.com      | admin123  | Admin     |
| teacher@spap.com    | teacher123| Teacher   |
| student@spap.com    | student123| Student   |

*Note: All default passwords must be changed in production.*
