# 🏫 School Management API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v14+-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-v4.18+-blue?logo=express)
![MySQL](https://img.shields.io/badge/MySQL-v5.7+-orange?logo=mysql)
![License](https://img.shields.io/badge/License-ISC-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

A comprehensive, production-ready Node.js REST API for managing schools and students with enterprise-grade security, error handling, and deployment capabilities.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [API Docs](#-api-endpoints) • [Deployment](#-deployment)

</div>

---

## 📖 Project Overview

School Management API is a robust backend solution designed to manage educational institutions. It provides RESTful endpoints for managing schools and student records with:

- ✅ **Scalable Architecture** - Modular MVC structure for easy expansion
- ✅ **Enterprise Security** - Production-hardened security features and best practices
- ✅ **Database Pooling** - MySQL connection pooling for high performance
- ✅ **Comprehensive Error Handling** - Detailed error responses without data leaks
- ✅ **Cloud-Ready** - Configured for deployment on Render, Railway, and other platforms
- ✅ **Well-Documented** - Extensive documentation and deployment guides

---

## ✨ Features

### Core Functionality
- 🏢 **School Management** - Create, read schools with geographic coordinates
- 👥 **Student Management** - Complete CRUD operations for student records
- 🔍 **Flexible Queries** - Filter and search capabilities
- 📍 **Geolocation Support** - Distance calculation using Haversine formula
- 📊 **Standardized Responses** - Consistent JSON response format across all endpoints

### Technical Features
- 🔐 **Security Headers** - XSS protection, frame denial, content-type sniffing prevention
- 🛡️ **Input Validation** - Comprehensive validation on all endpoints
- 💾 **SQL Injection Prevention** - Parameterized queries throughout
- ⚡ **Connection Pooling** - Efficient MySQL connection management
- 🔄 **Graceful Shutdown** - Clean server termination for cloud platforms
- 📈 **Error Tracking** - Detailed logging with environment-specific details
- 🏥 **Health Check** - Built-in health monitoring endpoint
- 🌍 **CORS Support** - Cross-origin resource sharing configured for production

---

## 🛠️ Tech Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Runtime** | Node.js | 14+ | JavaScript runtime environment |
| **Framework** | Express.js | 4.18+ | Web application framework |
| **Database** | MySQL | 5.7+ | Relational database |
| **Driver** | mysql2 | 3.6+ | MySQL client for Node.js |
| **Environment** | dotenv | 16.0+ | Environment variable management |
| **Middleware** | body-parser | 1.20+ | Request body parsing |
| **CORS** | cors | 2.8+ | Cross-origin request handling |
| **Dev Tools** | nodemon | 3.0+ | Auto-restart during development |

### Architecture Pattern
- **MVC Structure** - Separation of concerns with Models, Views, Controllers
- **Middleware Pipeline** - Layered request processing
- **Service Layer** - Centralized business logic
- **Error Handling** - Global error middleware

---

## 📁 Folder Structure

```
school-management/
├── config/
│   ├── database.js          # Legacy database connection
│   └── db.js                # MySQL database connection with pooling & error handling
├── controllers/
│   └── studentController.js # Student business logic (CRUD operations)
├── routes/
│   └── studentRoutes.js     # Student API routes
├── utils/
│   └── errorHandler.js      # Error handling utilities
├── server.js                # Main application entry point
├── schema.sql               # SQL schema for database & tables
├── DATABASE_SETUP.md        # Step-by-step database setup guide
├── package.json             # Project dependencies & scripts
├── .env                     # Environment variables (not in git)
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

```
school-management/
├── config/
│   ├── database.js              # Legacy database connection (deprecated)
│   └── db.js                    # MySQL connection pooling & error handling
├── controllers/
│   ├── schoolController.js      # School CRUD business logic
│   └── studentController.js     # Student CRUD business logic
├── routes/
│   ├── schoolRoutes.js          # School API endpoints
│   └── studentRoutes.js         # Student API endpoints
├── utils/
│   ├── errorHandler.js          # Global error handling middleware
│   ├── validators.js            # Input validation functions
│   └── distanceCalculator.js    # Haversine formula for geolocation
├── server.js                    # Main application entry point
├── package.json                 # Dependencies and scripts
├── schema.sql                   # Database schema
├── .env                         # Environment variables (not in git)
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── Procfile                     # Cloud platform process definition
├── README.md                    # Project documentation
├── DEPLOYMENT.md                # Deployment guide (Render, Railway)
├── PRODUCTION.md                # Production configuration guide
├── SECURITY_CHECKLIST.md        # Security verification checklist
├── QUICK_START_DEPLOY.md        # 5-minute quick deployment
├── VERIFY_BEFORE_DEPLOY.md      # Pre-deployment verification tests
├── DEPLOYMENT_INDEX.md          # Complete deployment index
└── DEPLOYMENT_READY.md          # Deployment status summary
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **MySQL** v5.7 or higher ([Download](https://www.mysql.com/downloads/))
- **Git** for version control

### Installation & Setup

#### Step 1: Clone and Install Dependencies
```bash
# Clone the repository
git clone <repository-url>
cd school-management

# Install dependencies
npm install
```

#### Step 2: Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your database credentials
nano .env  # or use your preferred editor
```

**Required environment variables:**
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
DB_PORT=3306
CORS_ORIGIN=*
API_VERSION=1.0.0
```

#### Step 3: Setup Database
```bash
# Create database and tables
mysql -u root -p < schema.sql

# Or manually run:
# 1. Create database: CREATE DATABASE school_management;
# 2. Use database: USE school_management;
# 3. Import schema.sql file
```

#### Step 4: Start the Server
```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

**Expected output:**
```
✅ Database Connected
🚀 Server is running on port 5000
```

---

## 🔧 Environment Variables

### Development Configuration
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=school_management
DB_PORT=3306
CORS_ORIGIN=*
API_VERSION=1.0.0
```

### Production Configuration
```env
PORT=8080
NODE_ENV=production
DB_HOST=prod-db.example.com
DB_USER=prod_user
DB_PASSWORD=secure_password
DB_NAME=school_mgmt_prod
DB_PORT=3306
CORS_ORIGIN=https://yourdomain.com
API_VERSION=1.0.0
```

### Variable Descriptions
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `PORT` | Number | 5000 | Server port |
| `NODE_ENV` | String | development | Environment (development/production) |
| `DB_HOST` | String | localhost | Database host |
| `DB_USER` | String | root | Database user |
| `DB_PASSWORD` | String | - | Database password |
| `DB_NAME` | String | school_management | Database name |
| `DB_PORT` | Number | 3306 | MySQL port |
| `CORS_ORIGIN` | String | * | Allowed origins for CORS |
| `API_VERSION` | String | 1.0.0 | API version |

---

## 🗄️ Database Setup

### Database Schema

**schools table:**
```sql
CREATE TABLE schools (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**students table:**
```sql
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  grade VARCHAR(50),
  age INT,
  school_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (school_id) REFERENCES schools(id)
);
```

### Automatic Setup
```bash
# Run the schema file
mysql -u root -p school_management < schema.sql

# Or manually in MySQL:
mysql -u root -p
> USE school_management;
> SOURCE schema.sql;
```

### Verify Setup
```bash
mysql -u root -p -e "USE school_management; SHOW TABLES;"
# Output should show: schools, students
```

---

## 📡 API Endpoints

### Response Format
All endpoints return standardized JSON responses:
```json
{
  "success": true,
  "message": "Operation successful",
  "statusCode": 200,
  "data": {}
}
```

### Health & Status Endpoints

#### GET `/` - Root Endpoint
Welcome endpoint with API information.

**Response:**
```bash
curl http://localhost:5000/
```

```json
{
  "success": true,
  "message": "Welcome to School Management API",
  "statusCode": 200,
  "data": {
    "version": "1.0.0",
    "endpoints": {
      "schools": "/api/schools",
      "students": "/api/students"
    }
  }
}
```

#### GET `/api/health` - Health Check
Check server status and database connectivity.

**Response:**
```bash
curl http://localhost:5000/api/health
```

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Health check successful",
  "timestamp": "2024-05-12T10:30:45.123Z"
}
```

### School Endpoints

#### POST `/api/schools/addSchool` - Create School
Create a new school record.

**Request:**
```bash
curl -X POST http://localhost:5000/api/schools/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "St. Mary School",
    "address": "123 Main Street, City",
    "latitude": 40.7128,
    "longitude": -74.0060
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "School added successfully",
  "statusCode": 201,
  "data": {
    "id": 1,
    "name": "St. Mary School",
    "address": "123 Main Street, City",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}
```

#### GET `/api/schools` - Get All Schools
Retrieve all schools with optional pagination.

**Request:**
```bash
curl http://localhost:5000/api/schools
```

**Response:**
```json
{
  "success": true,
  "message": "Schools retrieved successfully",
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "name": "St. Mary School",
      "address": "123 Main Street, City",
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    {
      "id": 2,
      "name": "Lincoln High School",
      "address": "456 Oak Avenue, Town",
      "latitude": 40.7580,
      "longitude": -73.9855
    }
  ]
}
```

#### GET `/api/schools/:id` - Get School by ID
Retrieve a specific school.

**Request:**
```bash
curl http://localhost:5000/api/schools/1
```

**Response:**
```json
{
  "success": true,
  "message": "School retrieved successfully",
  "statusCode": 200,
  "data": {
    "id": 1,
    "name": "St. Mary School",
    "address": "123 Main Street, City",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}
```

### Student Endpoints

#### POST `/api/students` - Create Student
Create a new student record.

**Request:**
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "555-123-4567",
    "grade": "10A",
    "age": 16
  }'
```

**Response:**
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

#### GET `/api/students` - Get All Students
Retrieve all student records.

**Request:**
```bash
curl http://localhost:5000/api/students
```

**Response:**
```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "555-123-4567",
      "grade": "10A",
      "age": 16
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "phone": "555-987-6543",
      "grade": "10B",
      "age": 16
    }
  ]
}
```

#### GET `/api/students/:id` - Get Student by ID
Retrieve a specific student.

**Request:**
```bash
curl http://localhost:5000/api/students/1
```

**Response:**
```json
{
  "success": true,
  "message": "Student retrieved successfully",
  "statusCode": 200,
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

#### PUT `/api/students/:id` - Update Student
Update student information.

**Request:**
```bash
curl -X PUT http://localhost:5000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "phone": "555-999-8888",
    "grade": "11A",
    "age": 17
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "statusCode": 200,
  "data": {
    "id": 1,
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "phone": "555-999-8888",
    "grade": "11A",
    "age": 17
  }
}
```

#### DELETE `/api/students/:id` - Delete Student
Remove a student record.

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/students/1
```

**Response:**
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "statusCode": 200,
  "data": {
    "id": 1,
    "deletedAt": "2024-05-12T10:35:12.456Z"
  }
}
```

---

## 📮 Postman Testing Guide

### Setup Postman

#### 1. Import Environment
Create a new Postman environment with variables:

**Environment Variables:**
```json
{
  "base_url": "http://localhost:5000",
  "port": "5000"
}
```

#### 2. Create Requests

**Example: Get All Schools**
- **Method:** GET
- **URL:** `{{base_url}}/api/schools`
- **Headers:** None required (auto-set)

**Example: Create Student**
- **Method:** POST
- **URL:** `{{base_url}}/api/students`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "grade": "10A",
    "age": 16
  }
  ```

### Test Collection Setup

Create a Postman collection with these requests:

#### Health & Status
- [ ] `GET {{base_url}}/` - Root endpoint
- [ ] `GET {{base_url}}/api/health` - Health check

#### Schools
- [ ] `POST {{base_url}}/api/schools/addSchool` - Create school
- [ ] `GET {{base_url}}/api/schools` - Get all schools
- [ ] `GET {{base_url}}/api/schools/1` - Get school by ID

#### Students
- [ ] `POST {{base_url}}/api/students` - Create student
- [ ] `GET {{base_url}}/api/students` - Get all students
- [ ] `GET {{base_url}}/api/students/1` - Get student by ID
- [ ] `PUT {{base_url}}/api/students/1` - Update student
- [ ] `DELETE {{base_url}}/api/students/1` - Delete student

### Running Tests

1. **Start Server:**
   ```bash
   npm start
   ```

2. **Open Postman Collection**
   - Import collection or create manually

3. **Execute Requests:**
   - Run individual requests
   - Or run entire collection using "Run Collection"

4. **Verify Responses:**
   - Status code: 200, 201, 400, 404, 500
   - Response format is standardized
   - Data is correct type

### Postman Test Scripts

Add tests to verify responses automatically:

```javascript
// Test: Status code is 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test: Response time is less than 500ms
pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Test: Response has required fields
pm.test("Response has required fields", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData).to.have.property('statusCode');
    pm.expect(jsonData).to.have.property('data');
});
```

---

## 🚀 Deployment

### Deployment Options

Your API is production-ready and supports multiple cloud platforms:

#### **Option 1: Render** (Recommended for Beginners)
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Auto-deploy from GitHub
- ✅ Simple dashboard
- ⏱️ Deployment time: ~5 minutes

**Steps:**
1. Push code to GitHub
2. Go to [Render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repository
5. Set environment variables
6. Deploy!

**Quick Guide:** [Read QUICK_START_DEPLOY.md](./QUICK_START_DEPLOY.md)

#### **Option 2: Railway**
- ✅ Modern interface
- ✅ Auto-database provisioning
- ✅ Automatic HTTPS
- ✅ Auto-deploy from GitHub
- ⏱️ Deployment time: ~5 minutes

**Steps:**
1. Push code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Create new project
4. Connect GitHub repository
5. Railway auto-detects and configures
6. Deploy!

**Quick Guide:** [Read QUICK_START_DEPLOY.md](./QUICK_START_DEPLOY.md)

#### **Option 3: Other Platforms**
- Heroku (using Procfile)
- AWS (EC2, App Runner, ECS)
- DigitalOcean (App Platform, VPS)
- Self-hosted servers

### Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests pass locally
- [ ] `.env` file is configured
- [ ] Database is set up
- [ ] `npm start` runs without errors
- [ ] Health check endpoint works
- [ ] All endpoints tested with Postman
- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` is committed (without secrets)
- [ ] `Procfile` exists in root directory
- [ ] Code is committed to GitHub
- [ ] Security headers verified
- [ ] CORS configured for production domain
- [ ] Error handling tested

### Environment Variables for Production
```env
NODE_ENV=production
PORT=8080
DB_HOST=your-prod-db.com
DB_USER=prod_user
DB_PASSWORD=your_secure_password
DB_NAME=school_mgmt_prod
CORS_ORIGIN=https://yourdomain.com
```

### Deployment Verification

After deployment, verify your API:

```bash
# Check health endpoint
curl https://your-api.com/api/health

# Create a test school
curl -X POST https://your-api.com/api/schools/addSchool \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","address":"Test","latitude":40,"longitude":-74}'

# Get all schools
curl https://your-api.com/api/schools
```

**For detailed deployment guides:**
- 📘 [Complete Deployment Guide](./DEPLOYMENT.md)
- ⚡ [Quick Start Deploy](./QUICK_START_DEPLOY.md)
- 🔐 [Security Checklist](./SECURITY_CHECKLIST.md)
- ✅ [Verification Tests](./VERIFY_BEFORE_DEPLOY.md)

---

## 📦 Available Scripts

```bash
# Start server (production mode)
npm start

# Start with auto-restart (development)
npm run dev

# Install dependencies
npm install

# View installed packages
npm list
```

### Scripts Configuration
```json
{
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## 📚 Dependencies

- **express** - Web framework for Node.js
- **mysql2** - MySQL database driver with promise support
- **dotenv** - Load environment variables from .env file
- **cors** - Enable Cross-Origin Resource Sharing
- **body-parser** - Parse incoming request bodies
- **nodemon** - Auto-restart server during development

## 🛠️ Project Features

✅ MVC (Model-View-Controller) folder structure  
✅ Clean, beginner-friendly code with comments  
✅ Environment variable configuration  
✅ CORS enabled for cross-origin requests  
✅ Middleware setup (JSON parsing, CORS, body-parser)  
✅ Error handling utilities  
✅ MySQL connection pooling with promise support  
✅ Comprehensive database configuration (config/db.js)  
✅ RESTful API design  
✅ Example student controller and routes  
✅ SQL schema file for quick database setup  

## 📝 Best Practices Implemented

1. **Separation of Concerns** - Organized code into routes, controllers, and config
2. **Environment Variables** - Sensitive data stored in .env file
3. **Error Handling** - Centralized error handling utilities
4. **Code Comments** - Well-commented code for easy understanding
5. **RESTful Design** - Standard HTTP methods and status codes
6. **Database Pooling** - Efficient MySQL connection management with promise support
7. **Async/Await** - Modern JavaScript promises handling
8. **SQL Injection Prevention** - Parameterized queries throughout

## 🗄️ Database Configuration

The project includes a comprehensive MySQL configuration in `config/db.js`:

- **Connection Pooling** - Reuses connections for better performance
- **Error Logging** - Detailed error messages for debugging
- **Helper Functions** - Easy query execution with `executeQuery()`
- **Auto Connection Testing** - Tests database on server startup
- **Graceful Shutdown** - Properly closes connections with `closePool()`

### Using the Database Connection

In your controllers:

```javascript
const { pool, executeQuery } = require('../config/db');

// Method 1: Using the pool directly
const connection = await pool.getConnection();
const [results] = await connection.query('SELECT * FROM schools');
connection.release();

// Method 2: Using helper function
const results = await executeQuery('SELECT * FROM schools WHERE id = ?', [1]);
```

### Database Tables

- **schools** - School information with coordinates
- **students** - Student records linked to schools

See `schema.sql` for complete table structure.

## � Deployment

This API is production-ready and can be deployed to the cloud. For detailed deployment instructions:

**→ [Read the Full Deployment Guide](./DEPLOYMENT.md)**

### Quick Deployment Summary

**Render** (Free tier available)
- Push code to GitHub
- Connect repository to Render
- Set environment variables
- Auto-deploys on push ✅

**Railway** (Modern & simple)
- Connect GitHub account
- Select repository
- Railway auto-configures database
- Auto-deploys on push ✅

### Environment Variables for Production
- Copy from `.env.example` and update values
- Store in platform environment settings (not in code)
- Never commit `.env` file to git

### Pre-Deployment Checklist
- [ ] `.env.example` configured with your settings
- [ ] Database created and tables initialized
- [ ] `npm start` tested locally
- [ ] All endpoints tested with Postman/Bruno
- [ ] `.env` added to `.gitignore`
- [ ] Code pushed to GitHub

## �🚨 Common Issues

### Database Connection Failed
- Verify MySQL is running
- Check DB credentials in .env file
- Ensure database name exists
- See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed troubleshooting

### Port Already in Use
- Change the PORT in .env file
- Or kill the process using the port

### Module not found
- Run `npm install` to install all dependencies

## 📖 Next Steps

1. Add authentication (JWT)
2. Add input validation
3. Add teachers and classes endpoints
4. Implement database migrations
5. Add unit tests
6. Add API documentation with Swagger

## 📄 License

ISC

## 👨‍💻 Contributing

Feel free to submit pull requests and report issues.

---

**Happy Coding! 🎉**
