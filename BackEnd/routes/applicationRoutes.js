const express = require('express');
const { getUserApplication, uploadPaymentReceipt, reviewPayment, getAllPayments, confirmPayment } = require('../controllers/applicationController'); // Adjust the path as necessary
const upload = require('../middleware/uploadMiddleware'); // Import the upload middleware
const router = express.Router();

// Route to get user application by ID
router.get('/:id', getUserApplication);

// Route to upload payment receipt
router.post('/upload-receipt', upload, uploadPaymentReceipt);

// Route to review payment
router.put('/review-payment/:id', reviewPayment);

// Route to get all payments
router.get('/payments', getAllPayments);

// Route to confirm payment
router.post('/confirm-payment/:paymentId', confirmPayment);

module.exports = router; 