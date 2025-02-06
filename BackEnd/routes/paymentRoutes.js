const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const Application = require('../models/Application');
const { verifyPaystackPayment } = require('../utils/paystack');
const { sendEmail } = require('../utils/email');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/receipts');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Verify online payment
router.post('/verify-payment', protect, async (req, res) => {
  const { reference } = req.body;
  
  try {
    const verificationResponse = await verifyPaystackPayment(reference);
    
    if (verificationResponse.status) {
      const application = await Application.findOne({ user: req.user._id }).sort('-createdAt');
      
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }

      application.paymentStatus = 'paid';
      application.paymentReference = reference;
      await application.save();

      // Send email confirmation
      await sendEmail(
        application.email,
        'Payment Confirmation',
        `Your payment has been confirmed. Reference: ${reference}`
      );

      res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload offline payment receipt
router.post('/offline-payment', protect, upload.single('receipt'), async (req, res) => {
  try {
    const { applicationId } = req.body;
    const application = await Application.findById(applicationId);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.paymentStatus = 'pending_verification';
    application.paymentReceipt = req.file.path;
    await application.save();

    // Send email notification to admin
    await sendEmail(
      process.env.ADMIN_EMAIL,
      'New Offline Payment Receipt',
      `A new offline payment receipt has been uploaded for application ID: ${applicationId}`
    );

    res.status(200).json({ message: 'Receipt uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payment receipt
router.get('/payment-receipt/:applicationId', protect, async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (!application.paymentReceipt) {
      return res.status(404).json({ message: 'No receipt found' });
    }

    res.status(200).json({ receiptUrl: application.paymentReceipt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 