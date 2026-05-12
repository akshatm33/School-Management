# Postman Collection Guide - School Management API

## Overview

This guide explains how to use the **School_Management_API.postman_collection.json** file with Postman to test all API endpoints.

---

## 📥 Importing the Collection

### Step 1: Open Postman

1. Download and install [Postman](https://www.postman.com/downloads/)
2. Launch Postman
3. Sign in or create a free account

### Step 2: Import Collection

**Method 1: Direct Import**
1. Click **File** → **Import**
2. Select the **School_Management_API.postman_collection.json** file
3. Click **Import**

**Method 2: Using Link**
1. Click **File** → **Import**
2. Select **Link** tab
3. Paste the collection URL
4. Click **Import**

**Method 3: Drag & Drop**
1. Simply drag the JSON file into Postman window
2. Collection imports automatically

### Step 3: Create Environment

1. Click the **Environments** icon (eye icon) on the left sidebar
2. Click **Create New Environment**
3. Name it: `School Management - Local`
4. Add these variables:
   ```
   base_url: http://localhost:5000
   school_id: 1
   student_id: 1
   ```
5. Click **Save**

---

## 🚀 Using the Collection

### Step 1: Start the API Server

```bash
cd school-management
npm install
npm start
```

Expected output:
```
✅ Database Connected
🚀 Server is running on port 5000
```

### Step 2: Select Environment

In Postman top-right corner, select **"School Management - Local"** from the environment dropdown.

### Step 3: Run Requests

The collection is organized into folders:

#### **Health & Status** (Test First)
1. Click **Root Endpoint** (GET /)
2. Click **Send**
3. Should see 200 status with welcome message

#### **Schools** (Create & Read)
1. **Create School**
   - Method: POST
   - URL: `{{base_url}}/api/schools/addSchool`
   - Body is pre-filled
   - Click **Send**
   - See 201 status (Created)

2. **List Schools**
   - Method: GET
   - URL: `{{base_url}}/api/schools`
   - Click **Send**
   - See all schools

3. **Get School by ID**
   - Method: GET
   - URL: `{{base_url}}/api/schools/{{school_id}}`
   - Click **Send**
   - See specific school

#### **Students** (Full CRUD)
1. **Create Student**
   - Method: POST
   - URL: `{{base_url}}/api/students`
   - Click **Send**
   - See 201 status

2. **List Students**
   - Method: GET
   - URL: `{{base_url}}/api/students`
   - Click **Send**

3. **Get Student by ID**
   - Method: GET
   - URL: `{{base_url}}/api/students/{{student_id}}`
   - Click **Send**

4. **Update Student**
   - Method: PUT
   - URL: `{{base_url}}/api/students/{{student_id}}`
   - Edit body as needed
   - Click **Send**

5. **Delete Student**
   - Method: DELETE
   - URL: `{{base_url}}/api/students/{{student_id}}`
   - Click **Send**

---

## 📋 API Endpoints Summary

### Health & Status
- ✅ `GET /` - Root endpoint
- ✅ `GET /api/health` - Health check

### Schools
- ✅ `POST /api/schools/addSchool` - Create school
- ✅ `GET /api/schools` - List all schools
- ✅ `GET /api/schools/:id` - Get school by ID

### Students
- ✅ `POST /api/students` - Create student
- ✅ `GET /api/students` - List all students
- ✅ `GET /api/students/:id` - Get student by ID
- ✅ `PUT /api/students/:id` - Update student
- ✅ `DELETE /api/students/:id` - Delete student

---

## 📝 Request Examples

### Create School

**Request:**
```json
POST {{base_url}}/api/schools/addSchool

{
  "name": "St. Mary's High School",
  "address": "123 Main Street, New York, NY 10001",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "School added successfully",
  "statusCode": 201,
  "data": {
    "id": 1,
    "name": "St. Mary's High School",
    "address": "123 Main Street, New York, NY 10001",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}
```

---

### List Schools

**Request:**
```
GET {{base_url}}/api/schools
```

**Response (200):**
```json
{
  "success": true,
  "message": "Schools retrieved successfully",
  "statusCode": 200,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "St. Mary's High School",
      "address": "123 Main Street, New York, NY 10001",
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  ]
}
```

---

### Create Student

**Request:**
```json
POST {{base_url}}/api/students

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "555-123-4567",
  "grade": "10A",
  "age": 16
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Student created successfully",
  "statusCode": 201,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "555-123-4567",
    "grade": "10A",
    "age": 16
  }
}
```

---

### List Students

**Request:**
```
GET {{base_url}}/api/students
```

**Response (200):**
```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "statusCode": 200,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "555-123-4567",
      "grade": "10A",
      "age": 16
    }
  ]
}
```

---

## ✅ Testing Workflow

### Quick Test (5 minutes)

1. **Health Check**
   - Run: `GET /api/health`
   - Verify: 200 status

2. **Create School**
   - Run: `POST /api/schools/addSchool`
   - Verify: 201 status with school data

3. **List Schools**
   - Run: `GET /api/schools`
   - Verify: Count = 1, data includes created school

4. **Create Student**
   - Run: `POST /api/students`
   - Verify: 201 status with student data

5. **List Students**
   - Run: `GET /api/students`
   - Verify: Count = 1, data includes created student

---

### Full Test (10 minutes)

Run all requests in order:

1. Health Check
2. Create School
3. Get School by ID
4. List Schools
5. Create Student
6. Get Student by ID
7. List Students
8. Update Student
9. Get Updated Student
10. Delete Student

---

## 🔍 Validation Rules

### School Validation
- `name`: Required, max 255 chars, must be unique
- `address`: Required, max 500 chars
- `latitude`: Required, between -90 and 90
- `longitude`: Required, between -180 and 180

**Examples:**
- ✅ Latitude: 40.7128 (valid)
- ❌ Latitude: 95 (invalid - exceeds 90)
- ✅ Longitude: -74.0060 (valid)
- ❌ Longitude: 200 (invalid - exceeds 180)

### Student Validation
- `name`: Required, max 255 chars
- `email`: Required, must be valid format, must be unique
- `phone`: Optional
- `grade`: Optional
- `age`: Optional, 0-120 if provided

**Examples:**
- ✅ Email: john@example.com (valid)
- ❌ Email: invalid-email (invalid format)
- ✅ Age: 16 (valid)
- ❌ Age: 150 (invalid - exceeds 120)

---

## 🚨 Error Codes & Responses

### 200 OK
Request successful
```json
{"success": true, "statusCode": 200, "data": {...}}
```

### 201 Created
Resource created successfully
```json
{"success": true, "statusCode": 201, "message": "School added successfully"}
```

### 400 Bad Request
Invalid input data
```json
{"success": false, "statusCode": 400, "message": "Latitude must be between -90 and 90"}
```

### 404 Not Found
Resource doesn't exist
```json
{"success": false, "statusCode": 404, "message": "School not found"}
```

### 409 Conflict
Duplicate entry (email or name)
```json
{"success": false, "statusCode": 409, "message": "School already exists"}
```

### 500 Server Error
Internal server error
```json
{"success": false, "statusCode": 500, "message": "Error adding school"}
```

### 503 Service Unavailable
Database connection lost
```json
{"success": false, "statusCode": 503, "message": "Database connection lost"}
```

---

## 💡 Pro Tips

### 1. Modify Request Bodies
- Select any request
- Click **Body** tab
- Edit the JSON
- Click **Send**

### 2. Copy ID from Response
- After creating a school/student
- Copy the ID from response
- Use it in subsequent requests
- Or let Postman auto-save with tests

### 3. Run Collection
- Click the collection name
- Click **Run** button
- Select requests to run
- Click **Run School Management API**
- View results in Summary

### 4. Add Tests
Click **Tests** tab and add:
```javascript
pm.test("Status code is 200", function () {
    pm.expect(pm.response.code).to.equal(200);
});

pm.test("Response has success field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
});
```

### 5. Save Environment Variables
- Create/update environment
- Click **Save**
- Variables persist across sessions

---

## 🐛 Troubleshooting

### Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5000
```
**Solution:**
- Start the API server: `npm start`
- Check server is running on port 5000
- Verify `base_url` environment variable

### 400 Bad Request
```
"Latitude must be between -90 and 90"
```
**Solution:**
- Check latitude value in request body
- Must be between -90 and 90
- Example: 40.7128 is valid

### 404 Not Found
```
"School not found"
```
**Solution:**
- Verify school ID exists
- Create a school first
- Use correct ID in request

### 409 Conflict
```
"School already exists" or "Email already exists"
```
**Solution:**
- Use unique name for schools
- Use unique email for students
- Or delete existing record first

### Variables Not Working
```
{{base_url}} shows as literal text
```
**Solution:**
- Check environment is selected (top-right dropdown)
- Verify variable names match exactly
- Click save after editing environment

---

## 📊 Collection Features

### Pre-built Responses
Each request includes multiple response examples:
- ✅ Success responses (200, 201)
- ❌ Error responses (400, 404, 409, 500, 503)

### Automatic Variable Capture
Tests automatically save IDs:
```javascript
if (pm.response.code === 201) {
    var jsonData = pm.response.json();
    pm.environment.set("school_id", jsonData.data.id);
}
```

### Organized Folders
- Health & Status
- Schools
- Students

### Ready-to-Use Environment
- Variables pre-configured
- Just import and use

---

## 🎯 Next Steps

1. **Import Collection** - School_Management_API.postman_collection.json
2. **Create Environment** - School Management - Local
3. **Start Server** - `npm start`
4. **Run Tests** - Start with Health Check
5. **Explore Endpoints** - Create, read, update, delete
6. **Verify Database** - Check MySQL for created records

---

## 📚 Additional Resources

- [Postman Documentation](https://learning.postman.com/)
- [API Best Practices](https://swagger.io/specification/)
- [REST API Guide](https://restfulapi.net/)
- [JSON Format](https://www.json.org/)

---

## 🆘 Support

### Issues?
1. Check the **Troubleshooting** section above
2. Verify server is running: `npm start`
3. Check environment variables in Postman
4. Review request body format
5. Check API documentation in README.md

### Common Checks
- ✅ Server running on port 5000
- ✅ Database connected (MySQL)
- ✅ Environment selected in Postman
- ✅ Request body is valid JSON
- ✅ Content-Type header is application/json

---

**Happy Testing! 🚀**

**Export & Share:** Right-click collection → Export → Share with team
