const express = require('express');
const { getUserApplication } = require('../controllers/applicationController'); // Adjust the path as necessary
const router = express.Router();

// Route to get user application by ID
router.get('/:id', getUserApplication);

module.exports = router; 