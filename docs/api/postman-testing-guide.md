# SPAP API Testing Guide (Postman)

## Prerequisites

1. Install [Postman](https://www.postman.com/downloads/)
2. Start MongoDB locally or use MongoDB Atlas
3. Start the server: `npm run dev` (from server directory)

## Setup Instructions

### Step 1: Import Collection
1. Open Postman
2. Click **File → Import** (or `Ctrl+O`)
3. Select `server/SPAP_Postman_Collection.json`
4. The collection "Student Performance Analytics Portal API" will appear

### Step 2: Set Up Authentication
The collection uses Postman variables:
- `{{base_url}}` = `http://localhost:5000/api`
- `{{token}}` = auto-populated after login
- `{{student_id}}` = set manually after creating/getting a student

### Step 3: Test Flow

#### A. Health Check
1. Open **System → Health Check**
2. Send the request → expect `200 OK` with status: "OK"

#### B. Register & Login
1. Open **Auth → Register User** → Send
   - Creates a test user account
   - Token auto-saves to `{{token}}`
2. Open **Auth → Login** → Send
   - Logs in as admin (`admin@spap.com` / `admin123`)
   - Token auto-saves to `{{token}}`

#### C. Students CRUD
1. **Create Student** → Send
   - Creates a new student record
   - Copy the `_id` from response → set as `{{student_id}}` variable
2. **Get All Students** → Send
   - Returns paginated list
   - Try `?search=alice&course=Computer+Science`
3. **Get Student By ID** → Send
   - Uses `{{student_id}}` variable
4. **Update Student** → Send
   - Updates phone and address
5. **Delete Student** → Send
   - Removes student and related performances

#### D. Performance Records
1. **Get Performance Stats** → Send
   - Shows aggregate statistics across all records
2. **Get Grade Distribution** → Send
   - Shows A+, A, B+, B, C+, C, D, F counts
3. **Get All Performance Records** → Send
   - Paginated with populate
4. **Get Performance By Student** → Send
   - Uses `{{student_id}}`

#### E. Courses CRUD
1. **Create Course** → Send
   - Requires admin role
2. **Get All Courses** → Send
   - Returns course list

## Manual Variable Setup

After running **Get All Students**, set `{{student_id}}`:
```json
// Copy _id from first student in response
pm.collectionVariables.set("student_id", "_id_value_here");
```

## Expected Test Results

| Endpoint                     | Method | Expected Status |
|------------------------------|--------|-----------------|
| /api/health                  | GET    | 200             |
| /api/auth/register           | POST   | 201             |
| /api/auth/login              | POST   | 200             |
| /api/auth/me                 | GET    | 200             |
| /api/students                | GET    | 200             |
| /api/students/:id            | GET    | 200             |
| /api/students                | POST   | 201             |
| /api/students/:id            | PUT    | 200             |
| /api/students/:id            | DELETE | 200             |
| /api/performance             | GET    | 200             |
| /api/performance/stats       | GET    | 200             |
| /api/performance/grade-distribution | GET | 200         |
| /api/performance/:id         | POST   | 201             |
| /api/courses                 | GET    | 200             |
| /api/courses                 | POST   | 201             |

## Troubleshooting

| Issue                    | Solution                                    |
|--------------------------|---------------------------------------------|
| Token not saving         | Check test scripts in Login request         |
| 401 Unauthorized         | Run Login first, check {{token}} variable   |
| 404 Not Found            | Check {{student_id}} is set correctly       |
| MongoDB connection fail  | Start MongoDB or check URI in .env          |
| Port in use              | Change PORT in .env or kill existing process|
