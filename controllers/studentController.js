const { pool } = require('../config/db');
const { validateStudentData, validateId } = require('../utils/validators');

exports.getAllStudents = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [students] = await connection.query('SELECT * FROM students');
    connection.release();

    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      statusCode: 200,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error('❌ Error fetching students:', error.message);

    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      return res.status(503).json({
        success: false,
        message: 'Database connection lost',
        statusCode: 503,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error retrieving students',
      statusCode: 500,
    });
  }
};

exports.getStudentById = async (req, res) => {
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
    const [student] = await connection.query('SELECT * FROM students WHERE id = ?', [id]);
    connection.release();

    if (student.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
        statusCode: 404,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      statusCode: 200,
      data: student[0],
    });
  } catch (error) {
    console.error('❌ Error fetching student:', error.message);

    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      return res.status(503).json({
        success: false,
        message: 'Database connection lost',
        statusCode: 503,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error retrieving student',
      statusCode: 500,
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, email, phone, grade, age } = req.body;

    const validation = validateStudentData({ name, email, phone, grade, age });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.error,
        statusCode: 400,
      });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO students (name, email, phone, grade, age) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || null, grade || null, age || null]
    );
    connection.release();

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      statusCode: 201,
      data: {
        id: result.insertId,
        name,
        email,
        phone: phone || null,
        grade: grade || null,
        age: age || null,
      },
    });
  } catch (error) {
    console.error('❌ Error creating student:', error.message);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Student email already exists',
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
      message: 'Error creating student',
      statusCode: 500,
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, grade, age } = req.body;

    const idValidation = validateId(id);
    if (!idValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: idValidation.error,
        statusCode: 400,
      });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'UPDATE students SET name = ?, email = ?, phone = ?, grade = ?, age = ? WHERE id = ?',
      [name, email, phone || null, grade || null, age || null, id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
        statusCode: 404,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      statusCode: 200,
      data: {
        id,
        name,
        email,
        phone: phone || null,
        grade: grade || null,
        age: age || null,
      },
    });
  } catch (error) {
    console.error('❌ Error updating student:', error.message);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Student email already exists',
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
      message: 'Error updating student',
      statusCode: 500,
    });
  }
};

exports.deleteStudent = async (req, res) => {
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
    const [result] = await connection.query('DELETE FROM students WHERE id = ?', [id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
        statusCode: 404,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      statusCode: 200,
      data: {
        id,
      },
    });
  } catch (error) {
    console.error('❌ Error deleting student:', error.message);

    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      return res.status(503).json({
        success: false,
        message: 'Database connection lost',
        statusCode: 503,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      statusCode: 500,
    });
  }
};
