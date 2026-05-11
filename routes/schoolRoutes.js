const express = require('express');
const schoolController = require('../controllers/schoolController');

const router = express.Router();

router.post('/addSchool', schoolController.addSchool);
router.get('/', schoolController.getAllSchools);
router.get('/:id', schoolController.getSchoolById);

module.exports = router;
