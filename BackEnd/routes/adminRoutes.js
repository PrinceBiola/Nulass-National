const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { 
  getAllApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');

// Get all applications
router.get('/applications', protect, admin, getAllApplications);

// Update application status
router.put('/applications/:id/status', protect, admin, updateApplicationStatus);

module.exports = router; 