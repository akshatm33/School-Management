/**
 * MySQL Database Configuration
 * 
 * This file handles the MySQL database connection using mysql2/promise package
 * It supports both async/await and promise-based operations
 * Connection pooling is used for optimal performance
 */

// Import mysql2 promise-based library
const mysql = require('mysql2/promise');

// Load environment variables from .env file
require('dotenv').config();

/**
 * Create MySQL Connection Pool
 * A pool allows multiple concurrent connections to the database
 * This improves performance by reusing connections
 */
const pool = mysql.createPool({
  // Host where MySQL server is running
  host: process.env.DB_HOST || 'localhost',
  
  // MySQL username
  user: process.env.DB_USER || 'root',
  
  // MySQL password
  password: process.env.DB_PASSWORD || 'roo123',
  
  // Default database name (can be changed per query if needed)
  database: process.env.DB_NAME || 'school_management',
  
  // MySQL port (default is 3306)
  port: process.env.DB_PORT || 3306,
  
  // Connection pool settings
  waitForConnections: true,      // Wait if no connection is available
  connectionLimit: 10,            // Maximum number of connections
  queueLimit: 0,                  // Unlimited queue for connection requests
  enableKeepAlive: true,          // Enable keep-alive to prevent timeout
  keepAliveInitialDelayMs: 0,     // Delay before starting keep-alive
});

/**
 * Test database connection on startup
 * This ensures the database is accessible before the server starts
 */
async function testConnection() {
  try {
    // Attempt to get a connection from the pool
    const connection = await pool.getConnection();
    
    // Log success message
    console.log('✅ MySQL Database Connected Successfully');
    console.log(`   Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`   Database: ${process.env.DB_NAME || 'school_management'}`);
    console.log(`   Port: ${process.env.DB_PORT || 3306}`);
    
    // Release connection back to pool
    connection.release();
    
    return true;
  } catch (error) {
    // Log error message if connection fails
    console.error('❌ MySQL Connection Error:');
    console.error(`   Error: ${error.message}`);
    console.error(`   Code: ${error.code}`);
    
    // Common error codes and their meanings
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('   → Incorrect username or password');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('   → Database does not exist');
    } else if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('   → Database connection was closed');
    }
    
    return false;
  }
}

/**
 * Execute a query with the pool
 * This function handles getting a connection and executing queries
 * 
 * @param {string} query - SQL query string
 * @param {array} params - Query parameters for parameterized queries
 * @returns {Promise} Query result
 */
async function executeQuery(query, params = []) {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();
    
    // Execute query with parameters (prevents SQL injection)
    const [results] = await connection.query(query, params);
    
    return results;
  } catch (error) {
    console.error('❌ Database Query Error:', error.message);
    throw error;
  } finally {
    // Always release connection back to pool
    if (connection) {
      connection.release();
    }
  }
}

/**
 * Close all connections in the pool
 * This should be called when the server shuts down
 */
async function closePool() {
  try {
    await pool.end();
    console.log('✅ Database pool closed');
  } catch (error) {
    console.error('❌ Error closing database pool:', error.message);
  }
}

// Test connection when module is loaded
testConnection();

/**
 * Export database functionality
 */
module.exports = {
  pool,                  // Raw connection pool for advanced use
  executeQuery,          // Helper function for executing queries
  closePool,            // Function to close all connections
  testConnection,       // Function to test database connection
};
