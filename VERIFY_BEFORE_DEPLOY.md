# 🧪 Pre-Deployment Verification Guide

Use this guide to verify everything is working before deploying to production.

---

## 📋 Local Environment Verification

### Step 1: Install Dependencies
```bash
npm install
```
✅ **Success:** No errors, `node_modules` folder created  
❌ **Error:** See npm error log, verify Node.js version

### Step 2: Check Node.js Version
```bash
node --version
```
✅ **Success:** v14.0.0 or higher  
❌ **Error:** Update Node.js from nodejs.org

### Step 3: Configure `.env` for Testing
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root123
DB_NAME=school_management
DB_PORT=3306
API_VERSION=v1
```

### Step 4: Verify Database Connection
```bash
npm start
```

Watch for this message:
```
✅ MySQL Database Connected Successfully
   Host: localhost
   Database: school_management
   Port: 3306
```

✅ **Success:** Message appears  
❌ **Error:** Check database is running and credentials are correct

---

## 🌐 Test API Endpoints

Open a new terminal while server is running.

### Test 1: Root Endpoint
```bash
curl http://localhost:5000/
```

✅ **Expected Response:**
```json
{
  "success": true,
  "message": "Welcome to School Management API",
  "statusCode": 200,
  "version": "v1",
  "endpoints": {
    "health": "/api/health",
    "students": "/api/students",
    "schools": "/api/schools"
  }
}
```

### Test 2: Health Check
```bash
curl http://localhost:5000/api/health
```

✅ **Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "statusCode": 200,
  "timestamp": "2024-05-12T10:30:00.000Z"
}
```

### Test 3: Create School
```bash
curl -X POST http://localhost:5000/api/schools/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Central High School",
    "address": "123 Main Street",
    "latitude": 40.7128,
    "longitude": -74.0060
  }'
```

✅ **Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "School added successfully",
  "statusCode": 201,
  "data": {
    "id": 1,
    "name": "Central High School",
    "address": "123 Main Street",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}
```

### Test 4: Get All Schools
```bash
curl http://localhost:5000/api/schools
```

✅ **Expected Response:**
```json
{
  "success": true,
  "message": "Schools retrieved successfully",
  "statusCode": 200,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "Central High School",
      "address": "123 Main Street",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "created_at": "2024-05-12T10:30:00.000Z",
      "updated_at": "2024-05-12T10:30:00.000Z"
    }
  ]
}
```

### Test 5: Get School by ID
```bash
curl http://localhost:5000/api/schools/1
```

✅ **Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "School retrieved successfully",
  "statusCode": 200,
  "data": { ... school data ... }
}
```

### Test 6: Get Non-existent School (Error Handling)
```bash
curl http://localhost:5000/api/schools/99999
```

✅ **Expected Response (404 Not Found):**
```json
{
  "success": false,
  "message": "School not found",
  "statusCode": 404
}
```

### Test 7: Invalid Request (Validation)
```bash
curl -X POST http://localhost:5000/api/schools/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "School",
    "address": "Address",
    "latitude": 100,
    "longitude": -74.0060
  }'
```

✅ **Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Latitude must be between -90 and 90",
  "statusCode": 400
}
```

### Test 8: Create Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "grade": "10A",
    "age": 16
  }'
```

✅ **Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Student created successfully",
  "statusCode": 201,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "grade": "10A",
    "age": 16
  }
}
```

### Test 9: Get All Students
```bash
curl http://localhost:5000/api/students
```

✅ **Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "statusCode": 200,
  "count": 1,
  "data": [ ... student data ... ]
}
```

### Test 10: Update Student
```bash
curl -X PUT http://localhost:5000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "0987654321",
    "grade": "10B",
    "age": 16
  }'
```

✅ **Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "statusCode": 200,
  "data": { ... updated student ... }
}
```

### Test 11: Delete Student
```bash
curl -X DELETE http://localhost:5000/api/students/1
```

✅ **Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "statusCode": 200,
  "data": { "id": 1 }
}
```

### Test 12: Invalid Route (404)
```bash
curl http://localhost:5000/invalid/route
```

✅ **Expected Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Route not found",
  "statusCode": 404,
  "path": "/invalid/route",
  "method": "GET"
}
```

---

## 🔐 Security Verification

### Check 1: Security Headers
```bash
curl -i http://localhost:5000/
```

Look for these headers in response:
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `X-XSS-Protection: 1; mode=block`

### Check 2: CORS Configuration
```bash
curl -H "Origin: http://example.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS http://localhost:5000/api/schools/addSchool
```

✅ **Expected:** CORS headers present in response

### Check 3: No Sensitive Data in Logs
```bash
# Make an error request
curl -X POST http://localhost:5000/api/schools/addSchool \
  -H "Content-Type: application/json" \
  -d '{ "invalid": "data" }'
```

✅ **Check:** Error message doesn't expose database details

---

## 📊 Database Verification

### Check 1: Tables Exist
```bash
mysql -u root -p school_management -e "SHOW TABLES;"
```

✅ **Expected Output:**
```
+---------------------------+
| Tables_in_school_management |
+---------------------------+
| schools                   |
| students                  |
+---------------------------+
```

### Check 2: Schools Table Structure
```bash
mysql -u root -p school_management -e "DESCRIBE schools;"
```

✅ **Expected Columns:**
- id, name, address, latitude, longitude, created_at, updated_at

### Check 3: Students Table Structure
```bash
mysql -u root -p school_management -e "DESCRIBE students;"
```

✅ **Expected Columns:**
- id, school_id, name, email, phone, grade, age, created_at, updated_at

### Check 4: Test Data Persists
```bash
# Data should still be there after server restart
npm start
curl http://localhost:5000/api/schools
```

✅ **Expected:** Created schools appear in response

---

## 🚀 Production Simulation

### Test 1: Production Mode Locally
```bash
NODE_ENV=production npm start
```

✅ **Expected:**
- Server starts normally
- Still connects to database
- Health check works

### Test 2: Different Port
```bash
PORT=3000 npm start
```

✅ **Expected:**
- Server runs on port 3000
- Endpoints accessible at `http://localhost:3000`

### Test 3: Graceful Shutdown
```bash
# Start server
npm start

# In another terminal, send shutdown signal
kill <server-process-id>
```

✅ **Expected:** Server closes gracefully with message

---

## ✅ Pre-Deployment Checklist

Before pushing to GitHub:

- [ ] All 12 endpoint tests pass
- [ ] Security headers present
- [ ] CORS configured
- [ ] Database tables exist
- [ ] Test data persists
- [ ] Production mode works
- [ ] Different port works
- [ ] `.env` NOT in git
- [ ] `.env.example` properly configured
- [ ] `.gitignore` has `.env`
- [ ] `package.json` scripts correct
- [ ] Dependencies installed without warnings
- [ ] No console.log() in production code

---

## 🆘 Troubleshooting

### Endpoint returns 503
**Problem:** Database connection failed
```bash
# Check MySQL is running
mysql -u root -p

# Check credentials in .env
cat .env
```

### Port already in use
**Problem:** Another process using port 5000
```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000
```

### Request returns 400
**Problem:** Validation error
- Check all required fields present
- Check data types (latitude/longitude are numbers)
- Check string length limits

### Database table doesn't exist
**Problem:** Schema not imported
```bash
# Verify database created
mysql -u root -p -e "SHOW DATABASES;" | grep school

# Import schema
mysql -u root -p school_management < schema.sql
```

---

## 📝 Test Results

Use this table to track your testing:

| Test | Local | Staging | Production |
|------|-------|---------|------------|
| Root endpoint | ✅ | ⬜ | ⬜ |
| Health check | ✅ | ⬜ | ⬜ |
| Create school | ✅ | ⬜ | ⬜ |
| Get all schools | ✅ | ⬜ | ⬜ |
| Get by ID | ✅ | ⬜ | ⬜ |
| Not found error | ✅ | ⬜ | ⬜ |
| Validation error | ✅ | ⬜ | ⬜ |
| Create student | ✅ | ⬜ | ⬜ |
| Get all students | ✅ | ⬜ | ⬜ |
| Update student | ✅ | ⬜ | ⬜ |
| Delete student | ✅ | ⬜ | ⬜ |
| Invalid route | ✅ | ⬜ | ⬜ |
| Security headers | ✅ | ⬜ | ⬜ |
| Database persists | ✅ | ⬜ | ⬜ |

---

## 🎉 Ready to Deploy!

Once all tests pass locally, you're ready to:
1. Push to GitHub: `git push origin main`
2. Deploy to Render or Railway
3. Run same tests on production URL
4. Celebrate! 🚀

For deployment steps, see [QUICK_START_DEPLOY.md](./QUICK_START_DEPLOY.md)

---

**Last Updated:** May 12, 2024
