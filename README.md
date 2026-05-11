# School Management API

A complete Node.js backend API built with Express.js and MySQL for managing school operations.

## 📋 Project Structure

```
school-management/
├── config/
│   └── database.js          # MySQL database connection configuration
├── controllers/
│   └── studentController.js # Student business logic
├── routes/
│   └── studentRoutes.js     # Student API routes
├── utils/
│   └── errorHandler.js      # Error handling utilities
├── server.js                # Main application entry point
├── package.json             # Project dependencies
├── .env                     # Environment variables (not in git)
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL (v5.7 or higher)

### Installation

1. **Clone the repository** (if not already done)
   ```bash
   git clone <repository-url>
   cd school-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Edit the `.env` file with your database credentials
   ```
   PORT=5000
   NODE_ENV=development
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=school_management
   DB_PORT=3306
   ```

4. **Create MySQL database**
   ```sql
   CREATE DATABASE school_management;
   
   USE school_management;
   
   CREATE TABLE students (
     id INT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     phone VARCHAR(15),
     grade VARCHAR(10),
     age INT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

## 📦 Available Scripts

### Development Mode (with auto-restart)
```bash
npm run dev
```
Uses nodemon to automatically restart the server on file changes.

### Production Mode
```bash
npm start
```
Runs the server in production mode.

## 🔌 API Endpoints

### Health Check
- **GET** `/api/health` - Check if server is running

### Students

#### Get all students
```bash
GET /api/students
```

#### Get student by ID
```bash
GET /api/students/:id
```

#### Create new student
```bash
POST /api/students
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "grade": "10A",
  "age": 16
}
```

#### Update student
```bash
PUT /api/students/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "0987654321",
  "grade": "10B",
  "age": 16
}
```

#### Delete student
```bash
DELETE /api/students/:id
```

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
✅ Database connection pooling  
✅ RESTful API design  
✅ Example student controller and routes  

## 📝 Best Practices Implemented

1. **Separation of Concerns** - Organized code into routes, controllers, and config
2. **Environment Variables** - Sensitive data stored in .env file
3. **Error Handling** - Centralized error handling utilities
4. **Code Comments** - Well-commented code for easy understanding
5. **RESTful Design** - Standard HTTP methods and status codes
6. **Database Pooling** - Efficient database connection management
7. **Async/Await** - Modern JavaScript promises handling

## 🚨 Common Issues

### Database Connection Failed
- Verify MySQL is running
- Check DB credentials in .env file
- Ensure database name exists

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
