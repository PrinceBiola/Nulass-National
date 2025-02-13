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

module.exports = router; 