/**
 * School Routes
 * 
 * Defines all API endpoints related to schools
 * Routes are connected to their respective controller methods
 */

const express = require('express');
const schoolController = require('../controllers/schoolController');

// Create router instance
const router = express.Router();

/**
 * @route   POST /api/schools/addSchool
 * @desc    Create a new school
 * @access  Public
 * @body    { name, address, latitude, longitude }
 * @returns School object with id, name, address, latitude, longitude
 */
router.post('/addSchool', schoolController.addSchool);

/**
 * @route   GET /api/schools
 * @desc    Get all schools
 * @access  Public
 * @returns Array of school objects
 */
router.get('/', schoolController.getAllSchools);

/**
 * @route   GET /api/schools/:id
 * @desc    Get school by ID
 * @access  Public
 * @param   id - School ID
 * @returns Single school object
 */
router.get('/:id', schoolController.getSchoolById);

// Export router
module.exports = router;
