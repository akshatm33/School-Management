const { pool } = require('../config/db');
const calculateDistance = require('../utils/distanceCalculator');

// Example: const distance = calculateDistance(40.7128, -74.0060, 34.0522, -118.2437); // ~3944 km

exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({
        status: 'error',
        message: 'School name is required and cannot be empty',
        code: 'MISSING_NAME',
      });
    }

    if (!address || address.trim() === '') {
      return res.status(400).json({
        status: 'error',
        message: 'School address is required and cannot be empty',
        code: 'MISSING_ADDRESS',
      });
    }

    if (latitude === undefined || latitude === null || latitude === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Latitude is required',
        code: 'MISSING_LATITUDE',
      });
    }

    const latValue = parseFloat(latitude);
    if (isNaN(latValue)) {
      return res.status(400).json({
        status: 'error',
        message: 'Latitude must be a valid number',
        code: 'INVALID_LATITUDE',
      });
    }

    if (latValue < -90 || latValue > 90) {
      return res.status(400).json({
        status: 'error',
        message: 'Latitude must be between -90 and 90',
        code: 'LATITUDE_OUT_OF_RANGE',
      });
    }

    if (longitude === undefined || longitude === null || longitude === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Longitude is required',
        code: 'MISSING_LONGITUDE',
      });
    }

    const lonValue = parseFloat(longitude);
    if (isNaN(lonValue)) {
      return res.status(400).json({
        status: 'error',
        message: 'Longitude must be a valid number',
        code: 'INVALID_LONGITUDE',
      });
    }

    if (lonValue < -180 || lonValue > 180) {
      return res.status(400).json({
        status: 'error',
        message: 'Longitude must be between -180 and 180',
        code: 'LONGITUDE_OUT_OF_RANGE',
      });
    }

    const connection = await pool.getConnection();
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await connection.query(query, [
      name.trim(),
      address.trim(),
      latValue,
      lonValue,
    ]);

    connection.release();
    res.status(201).json({
      status: 'success',
      message: 'School added successfully',
      code: 'SCHOOL_CREATED',
      data: {
        id: result.insertId,
        name: name.trim(),
        address: address.trim(),
        latitude: latValue,
        longitude: lonValue,
      },
    });
  } catch (error) {
    // Log error for debugging
    console.error('❌ Error adding school:', error.message);

    // ============================================
    // ERROR HANDLING
    // ============================================

    // Check for duplicate entry (if name or address is unique constraint)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        status: 'error',
        message: 'School with this name or address already exists',
        code: 'DUPLICATE_SCHOOL',
        error: error.message,
      });
    }

    // Database connection error
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      return res.status(503).json({
        status: 'error',
        message: 'Database connection lost',
        code: 'DB_CONNECTION_ERROR',
      });
    }

    // Generic database error
    if (error.code === 'ER_BAD_FIELD_ERROR') {
      return res.status(500).json({
        status: 'error',
        message: 'Database column error',
        code: 'DB_FIELD_ERROR',
      });
    }

    // Default error response
    res.status(500).json({
      status: 'error',
      message: 'Error adding school to database',
      code: 'INTERNAL_SERVER_ERROR',
      error: error.message,
    });
  }
};

/**
 * Get All Schools
 * GET /api/schools
 * 
 * Retrieves all schools from the database
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {JSON} Array of all schools
 */
exports.getAllSchools = async (req, res) => {
  try {
    // Get connection from pool
    const connection = await pool.getConnection();

    // Query to fetch all schools
    const [schools] = await connection.query('SELECT * FROM schools ORDER BY id DESC');

    // Release connection back to pool
    connection.release();

    // Send successful response
    res.status(200).json({
      status: 'success',
      message: 'Schools retrieved successfully',
      count: schools.length,
      data: schools,
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving schools',
      error: error.message,
    });
  }
};

/**
 * Get School by ID
 * GET /api/schools/:id
 * 
 * Retrieves a specific school by ID
 * 
 * @param {Object} req - Express request object with ID parameter
 * @param {Object} res - Express response object
 * @returns {JSON} Single school object
 */
exports.getSchoolById = async (req, res) => {
  try {
    // Get school ID from URL parameters
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid school ID',
      });
    }

    // Get connection from pool
    const connection = await pool.getConnection();

    // Query to fetch specific school
    const [school] = await connection.query(
      'SELECT * FROM schools WHERE id = ?',
      [id]
    );

    // Release connection
    connection.release();

    // Check if school exists
    if (school.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'School not found',
      });
    }

    // Send successful response
    res.status(200).json({
      status: 'success',
      message: 'School retrieved successfully',
      data: school[0],
    });
  } catch (error) {
    console.error('Error fetching school:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving school',
      error: error.message,
    });
  }
};
