const { pool } = require('../config/db');
const { validateSchoolData, validateId } = require('../utils/validators');

exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const validation = validateSchoolData({ name, address, latitude, longitude });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.error,
        statusCode: 400,
      });
    }

    const connection = await pool.getConnection();
    const query =
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await connection.query(query, [
      name.trim(),
      address.trim(),
      parseFloat(latitude),
      parseFloat(longitude),
    ]);
    connection.release();

    res.status(201).json({
      success: true,
      message: 'School added successfully',
      statusCode: 201,
      data: {
        id: result.insertId,
        name: name.trim(),
        address: address.trim(),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
  } catch (error) {
    console.error('❌ Error adding school:', error.message);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'School already exists',
        statusCode: 409,
      });
    }

    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      return res.status(503).json({
        success: false,
        message: 'Database connection lost',
        statusCode: 503,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error adding school to database',
      statusCode: 500,
    });
  }
};

exports.getAllSchools = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [schools] = await connection.query('SELECT * FROM schools ORDER BY id DESC');
    connection.release();

    res.status(200).json({
      success: true,
      message: 'Schools retrieved successfully',
      statusCode: 200,
      count: schools.length,
      data: schools,
    });
  } catch (error) {
    console.error('❌ Error fetching schools:', error.message);

    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      return res.status(503).json({
        success: false,
        message: 'Database connection lost',
        statusCode: 503,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error retrieving schools',
      statusCode: 500,
    });
  }
};

exports.getSchoolById = async (req, res) => {
  try {
    const { id } = req.params;

    const idValidation = validateId(id);
    if (!idValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: idValidation.error,
        statusCode: 400,
      });
    }

    const connection = await pool.getConnection();
    const [school] = await connection.query('SELECT * FROM schools WHERE id = ?', [id]);
    connection.release();

    if (school.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'School not found',
        statusCode: 404,
      });
    }

    res.status(200).json({
      success: true,
      message: 'School retrieved successfully',
      statusCode: 200,
      data: school[0],
    });
  } catch (error) {
    console.error('❌ Error fetching school:', error.message);

    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      return res.status(503).json({
        success: false,
        message: 'Database connection lost',
        statusCode: 503,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error retrieving school',
      statusCode: 500,
    });
  }
};
