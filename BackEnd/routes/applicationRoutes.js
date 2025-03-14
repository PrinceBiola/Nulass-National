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
  getUserApplicationHistory,
  initializePayment,
  generateMemberCard,
  verifyPaymentCallback,
  getMembershipStatus
} = require('../controllers/applicationController');

// Application routes
router.get('/user', protect, getUserApplication);
router.post('/', protect, createApplication);
router.get('/', protect, getApplications);
router.put('/:id', protect, updateApplication);
router.delete('/:id', protect, deleteApplication);
router.put('/:id/status', protect, updateApplicationStatus);
// router.post('/:id/verify-payment', protect, verifyPayment);
router.get('/history', protect, getUserApplicationHistory);

// Add new payment routes
router.post('/initialize-payment', protect, initializePayment);
router.get('/verify-payment', verifyPayment);

// Membership card routes
router.get('/:id/card', protect, generateMemberCard);
router.get('/membership-status', protect, getMembershipStatus);
router.post('/verify-callback', verifyPaymentCallback);

module.exports = router; 