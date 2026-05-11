const pool = require('../config/database');

exports.getAllStudents = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [students] = await connection.query('SELECT * FROM students');
    connection.release();

    // Send successful response
    res.status(200).json({
      status: 'success',
      message: 'Students retrieved successfully',
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving students',
      error: error.message,
    });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid student ID',
      });
    }

    const connection = await pool.getConnection();
    const [student] = await connection.query('SELECT * FROM students WHERE id = ?', [id]);
    connection.release();

    if (student.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found',
      });
    }

    // Send successful response
    res.status(200).json({
      status: 'success',
      message: 'Student retrieved successfully',
      data: student[0],
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving student',
      error: error.message,
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, email, phone, grade, age } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Name and email are required fields',
      });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO students (name, email, phone, grade, age) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || null, grade || null, age || null]
    );
    connection.release();

    res.status(201).json({
      status: 'success',
      message: 'Student created successfully',
      id: result.insertId,
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
    console.error('Error creating student:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error creating student',
      error: error.message,
    });
  }
};

/**
 * Update Student
 * PUT /api/students/:id
 * 
 * @param {Object} req - Express request object with ID and update data
 * @param {Object} res - Express response object
 * @returns {JSON} Updated student object
 */
exports.updateStudent = async (req, res) => {
  try {
    // Get student ID from URL parameters
    const { id } = req.params;
    const { name, email, phone, grade, age } = req.body;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid student ID',
      });
    }

    // Get connection from pool
    const connection = await pool.getConnection();

    // Update student in database
    const [result] = await connection.query(
      'UPDATE students SET name = ?, email = ?, phone = ?, grade = ?, age = ? WHERE id = ?',
      [name, email, phone || null, grade || null, age || null, id]
    );

    // Release connection
    connection.release();

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found',
      });
    }

    // Send successful response
    res.status(200).json({
      status: 'success',
      message: 'Student updated successfully',
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
    console.error('Error updating student:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating student',
      error: error.message,
    });
  }
};

/**
 * Delete Student
 * DELETE /api/students/:id
 * 
 * @param {Object} req - Express request object with ID parameter
 * @param {Object} res - Express response object
 * @returns {JSON} Success message
 */
exports.deleteStudent = async (req, res) => {
  try {
    // Get student ID from URL parameters
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid student ID',
      });
    }

    // Get connection from pool
    const connection = await pool.getConnection();

    // Delete student from database
    const [result] = await connection.query(
      'DELETE FROM students WHERE id = ?',
      [id]
    );

    // Release connection
    connection.release();

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found',
      });
    }

    // Send successful response
    res.status(200).json({
      status: 'success',
      message: 'Student deleted successfully',
      id,
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting student',
      error: error.message,
    });
  }
};
