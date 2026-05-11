/**
 * School Management API - Main Server File
 * This is the entry point of the application
 * 
 * Configurations:
 * - Express.js server setup
 * - Middleware configuration
 * - Route initialization
 * - Port listening
 */

// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const schoolRoutes = require('./routes/schoolRoutes');

// Initialize Express app
const app = express();

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================

// Enable CORS (Cross-Origin Resource Sharing)
// This allows requests from other domains
app.use(cors());

// Parse incoming request bodies as JSON
app.use(express.json());

// Alternative body parser middleware (already covered by express.json() in Express 4.16.0+)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ============================================
// BASIC ROUTES
// ============================================

/**
 * Health Check Endpoint
 * GET /api/health
 * Returns: Server status information
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Welcome Endpoint
 * GET /
 * Returns: Welcome message
 */
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

// ============================================
// API ROUTES
// ============================================

// Register student routes
app.use('/api/students', studentRoutes);

// Register school routes
app.use('/api/schools', schoolRoutes);

// ============================================
// ERROR HANDLING - 404 Not Found
// ============================================

/**
 * Handle 404 errors - Routes that don't exist
 */
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
