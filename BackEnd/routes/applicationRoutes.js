const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { receipt } = require('../middleware/uploadMiddleware');

// Import controller functions
const {
  getUserApplication,
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  uploadPaymentReceipt,
  reviewPayment,
  getAllPayments,
  confirmPayment
} = require('../controllers/applicationController');

// Application routes
router.get('/:id', protect, getUserApplication);
router.post('/', protect, createApplication);
router.get('/', protect, getApplications);
router.put('/:id', protect, updateApplication);
router.delete('/:id', protect, deleteApplication);

// Payment routes
router.post('/upload-receipt', protect, receipt, uploadPaymentReceipt);
router.put('/review-payment/:id', protect, reviewPayment);
router.get('/payments', protect, getAllPayments);
router.post('/confirm-payment/:paymentId', protect, confirmPayment);

module.exports = router; 