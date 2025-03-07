const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Import controller functions
const {
  getUserApplication,
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  updateApplicationStatus,
  verifyPayment,
  getUserApplicationHistory
} = require('../controllers/applicationController');

// Application routes
router.get('/user', protect, getUserApplication);
router.post('/', protect, createApplication);
router.get('/', protect, getApplications);
router.put('/:id', protect, updateApplication);
router.delete('/:id', protect, deleteApplication);
router.put('/:id/status', protect, updateApplicationStatus);
router.post('/:id/verify-payment', protect, verifyPayment);
router.get('/history', protect, getUserApplicationHistory);

module.exports = router; 