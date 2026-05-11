/**
 * Database Setup Guide
 * 
 * Follow these steps to set up the MySQL database for the School Management API
 */

// ============================================
// STEP 1: Install MySQL
// ============================================

/**
 * Download and install MySQL from: https://dev.mysql.com/downloads/mysql/
 * Or use package manager:
 * 
 * macOS (using Homebrew):
 *   brew install mysql
 *   brew services start mysql
 * 
 * Linux (Ubuntu/Debian):
 *   sudo apt-get install mysql-server
 *   sudo systemctl start mysql
 * 
 * Windows:
 *   Download from MySQL website and run installer
 *   Or use: choco install mysql
 */

// ============================================
// STEP 2: Connect to MySQL
// ============================================

/**
 * Open terminal/command prompt and connect to MySQL:
 * 
 * Command:
 *   mysql -u root -p
 * 
 * Then enter your MySQL root password (default is often blank on fresh install)
 * If you set a password during installation, enter it
 */

// ============================================
// STEP 3: Execute SQL Schema
// ============================================

/**
 * Method 1: Using mysql command line
 * 
 * Command:
 *   mysql -u root -p < schema.sql
 * 
 * This will:
 * - Create the database 'school_management'
 * - Create the 'schools' table
 * - Create the 'students' table
 * - Insert sample data (optional)
 */

/**
 * Method 2: Using MySQL Workbench or phpMyAdmin
 * 
 * 1. Open MySQL Workbench or phpMyAdmin
 * 2. Create new query
 * 3. Copy contents of schema.sql file
 * 4. Execute the query
 * 5. Verify tables are created
 */

/**
 * Method 3: Manual execution
 * 
 * Connect to MySQL:
 *   mysql -u root -p
 * 
 * Then copy and paste each query from schema.sql individually
 */

// ============================================
// STEP 4: Configure .env File
// ============================================

/**
 * Update the .env file with your MySQL credentials:
 * 
 * .env file content:
 * 
 *   PORT=5000
 *   NODE_ENV=development
 *   DB_HOST=localhost
 *   DB_USER=root
 *   DB_PASSWORD=your_mysql_password    (if you set one)
 *   DB_NAME=school_management
 *   DB_PORT=3306
 */

// ============================================
// STEP 5: Test Database Connection
// ============================================

/**
 * In project directory, run:
 *   npm run dev
 * 
 * You should see in console:
 *   ✅ MySQL Database Connected Successfully
 *      Host: localhost
 *      Database: school_management
 *      Port: 3306
 * 
 * If connection fails, check:
 * 1. MySQL server is running
 * 2. .env credentials are correct
 * 3. Database 'school_management' exists
 * 4. User has proper permissions
 */

// ============================================
// STEP 6: Verify Tables
// ============================================

/**
 * Connect to MySQL and run:
 * 
 *   mysql -u root -p school_management
 * 
 * Then check tables:
 * 
 *   SHOW TABLES;
 * 
 * Should show:
 *   - schools
 *   - students
 * 
 * View table structure:
 * 
 *   DESCRIBE schools;
 *   DESCRIBE students;
 * 
 * View sample data (if inserted):
 * 
 *   SELECT * FROM schools;
 *   SELECT * FROM students;
 */

// ============================================
// STEP 7: Start the Server
// ============================================

/**
 * Run development server:
 *   npm run dev
 * 
 * Run production server:
 *   npm start
 * 
 * Test API endpoints:
 *   GET http://localhost:5000/api/health
 */

// ============================================
// COMMON ISSUES & SOLUTIONS
// ============================================

/**
 * Issue 1: "Access denied for user 'root'@'localhost'"
 * Solution: Check DB_PASSWORD in .env matches your MySQL password
 * 
 * Issue 2: "Unknown database 'school_management'"
 * Solution: Run schema.sql to create the database
 * 
 * Issue 3: "Connection refused"
 * Solution: Make sure MySQL server is running
 * 
 * Issue 4: "Port 3306 is already in use"
 * Solution: Change DB_PORT in .env or stop other MySQL instances
 */

// ============================================
// USING THE DATABASE CONNECTION
// ============================================

/**
 * In your controller files, use the database connection:
 * 
 * const { pool, executeQuery } = require('../config/db');
 * 
 * // Method 1: Using the pool directly
 * const connection = await pool.getConnection();
 * const [results] = await connection.query('SELECT * FROM schools');
 * connection.release();
 * 
 * // Method 2: Using helper function
 * const results = await executeQuery('SELECT * FROM schools');
 */

// ============================================
// END OF SETUP GUIDE
// ============================================
