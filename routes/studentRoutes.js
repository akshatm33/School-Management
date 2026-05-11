/**
 * Student Routes
 * 
 * Defines all API endpoints related to students
 * Routes are connected to their respective controller methods
 */

const express = require('express');
const studentController = require('../controllers/studentController');

// Create router instance
const router = express.Router();

/**
 * @route   GET /api/students
 * @desc    Get all students
 * @access  Public
 */
router.get('/', studentController.getAllStudents);

/**
 * @route   GET /api/students/:id
 * @desc    Get student by ID
 * @access  Public
 */
router.get('/:id', studentController.getStudentById);

/**
 * @route   POST /api/students
 * @desc    Create a new student
 * @access  Public
 * @body    { name, email, phone, grade, age }
 */
router.post('/', studentController.createStudent);

/**
 * @route   PUT /api/students/:id
 * @desc    Update student by ID
 * @access  Public
 * @body    { name, email, phone, grade, age }
 */
router.put('/:id', studentController.updateStudent);

/**
 * @route   DELETE /api/students/:id
 * @desc    Delete student by ID
 * @access  Public
 */
router.delete('/:id', studentController.deleteStudent);

// Export router
module.exports = router;
