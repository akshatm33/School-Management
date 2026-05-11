require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const studentRoutes = require('./routes/studentRoutes');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to School Management API',
    version: process.env.API_VERSION || 'v1',
    endpoints: {
      health: '/api/health',
      students: '/api/students',
      schools: '/api/schools',
    },
  });
});

app.use('/api/students', studentRoutes);
app.use('/api/schools', schoolRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.path,
    method: req.method,
  });
});

// ============================================
// SERVER STARTUP
// ============================================

// Get PORT from environment variables or use default
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`
  ════════════════════════════════════════
  🚀 School Management API Server
  ════════════════════════════════════════
  ✅ Server is running on PORT: ${PORT}
  📍 Environment: ${process.env.NODE_ENV || 'development'}
  📅 Started at: ${new Date().toLocaleString()}
  
  Available endpoints:
  • GET  /                    - Welcome message
  • GET  /api/health          - Server health check
  
  STUDENTS:
  • GET  /api/students        - Get all students
  • GET  /api/students/:id    - Get student by ID
  • POST /api/students        - Create new student
  • PUT  /api/students/:id    - Update student
  • DELETE /api/students/:id  - Delete student
  
  SCHOOLS:
  • GET  /api/schools         - Get all schools
  • GET  /api/schools/:id     - Get school by ID
  • POST /api/schools/addSchool - Add new school
  
  Press CTRL+C to stop the server
  ════════════════════════════════════════
  `);
});

// Handle server errors
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'Reason:', reason);
});

module.exports = app;
