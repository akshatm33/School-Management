const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'roo123',
  database: process.env.DB_NAME || 'school_management',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Database Connected Successfully');
    console.log(`   Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`   Database: ${process.env.DB_NAME || 'school_management'}`);
    console.log(`   Port: ${process.env.DB_PORT || 3306}`);
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ MySQL Connection Error:');
    console.error(`   Error: ${error.message}`);
    console.error(`   Code: ${error.code}`);
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

async function executeQuery(query, params = []) {
  let connection;
  try {
    connection = await pool.getConnection();
    
    // Execute query with parameters (prevents SQL injection)
    const [results] = await connection.query(query, params);
    return results;
  } catch (error) {
    console.error('❌ Database Query Error:', error.message);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

async function closePool() {
  try {
    await pool.end();
    console.log('✅ Database pool closed');
  } catch (error) {
    console.error('❌ Error closing database pool:', error.message);
  }
}

testConnection();

module.exports = {
  pool,
  executeQuery,
  closePool,
  testConnection,
};
