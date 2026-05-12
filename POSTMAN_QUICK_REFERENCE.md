# 🚀 Postman Collection - Quick Reference

## 📦 What's Included

**File:** `School_Management_API.postman_collection.json`

Complete Postman collection with all 10 API endpoints:
- 2 Health & Status endpoints
- 3 School endpoints  
- 5 Student endpoints

---

## ⚡ Quick Start (2 Minutes)

### 1. Import Collection
```
File → Import → School_Management_API.postman_collection.json
```

### 2. Create Environment
- Click Environments
- New Environment: "School Management - Local"
- Add variable: `base_url = http://localhost:5000`
- Save

### 3. Select Environment
- Top-right dropdown → Choose "School Management - Local"

### 4. Start API Server
```bash
npm start
```

### 5. Test First Endpoint
- Click **Health & Status** → **Health Check**
- Click **Send**
- See 200 status ✅

---

## 📡 All Endpoints

### Health & Status
```
GET /                    ← Welcome message
GET /api/health         ← Server status
```

### Schools (Create, Read)
```
POST   /api/schools/addSchool        ← Create
GET    /api/schools                  ← List all
GET    /api/schools/:id              ← Get one
```

### Students (Full CRUD)
```
POST   /api/students                 ← Create
GET    /api/students                 ← List all
GET    /api/students/:id             ← Get one
PUT    /api/students/:id             ← Update
DELETE /api/students/:id             ← Delete
```

---

## 📝 Sample Requests

### Create School
```json
POST /api/schools/addSchool

{
  "name": "St. Mary School",
  "address": "123 Main St",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

### Create Student
```json
POST /api/students

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "grade": "10A",
  "age": 16
}
```

---

## ✅ Expected Responses

### Success (201)
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Created successfully",
  "data": { /* object */ }
}
```

### Success (200)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Retrieved successfully",
  "data": { /* object or array */ }
}
```

### Error (400)
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Invalid input"
}
```

---

## 🎯 Test Workflow

1. **Health Check** - `GET /api/health`
2. **Create School** - `POST /api/schools/addSchool`
3. **List Schools** - `GET /api/schools`
4. **Create Student** - `POST /api/students`
5. **List Students** - `GET /api/students`
6. **Update Student** - `PUT /api/students/1`
7. **Delete Student** - `DELETE /api/students/1`

---

## 🔑 Environment Variables

```
base_url   = http://localhost:5000
school_id  = 1
student_id = 1
```

Use in requests: `{{base_url}}/api/schools/{{school_id}}`

---

## ⚙️ Collection Features

✅ Pre-built request bodies  
✅ Example responses included  
✅ Error cases documented  
✅ Auto-save IDs from responses  
✅ Environment variables  
✅ Organized into folders  
✅ Descriptions for each endpoint  

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Connection refused | Start server: `npm start` |
| 404 Not Found | Create school/student first |
| 400 Bad Request | Check request body format |
| 409 Conflict | Use unique names/emails |
| Variables blank | Select environment (top-right) |

---

## 📚 Full Documentation

- **POSTMAN_GUIDE.md** - Detailed guide (10+ pages)
- **README.md** - API overview
- **DEPLOYMENT.md** - Production setup

---

**Ready to test? Import the collection and run endpoints! 🎉**
