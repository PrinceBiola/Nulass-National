const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const Application = require('../models/Application');
const { verifyPaystackPayment } = require('../utils/paystack');
const { sendEmail } = require('../utils/email');
// const { sendEmail } = require('../utils/email');

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
router.post('/verify', protect, async (req, res) => {
  const { reference, applicationId } = req.body;
  
  try {
    // First verify the payment with Paystack
    const verificationResponse = await verifyPaystackPayment(reference);
    
    if (verificationResponse.status) {
      // Find the application
      const application = await Application.findById(applicationId);
      
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }

      // Update application payment status
      application.paymentStatus = 'paid';
      application.paymentReference = reference;
      await application.save();

      // Send email confirmation
      await sendEmail(
        application.email,
        'Payment Confirmation',
        `Your payment has been confirmed. Reference: ${reference}`
      );

      res.status(200).json({ 
        message: 'Payment verified successfully', 
        application 
      });
    } else {
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Upload offline payment receipt
router.post('/offline-payment', protect, upload.single('receipt'), async (req, res) => {
  try {
    const { applicationId } = req.body;
    
    // Find the application
    const application = await Application.findById(applicationId);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No receipt file uploaded' });
    }

    // Update application payment status
    application.paymentStatus = 'pending_verification';
    application.paymentReceipt = req.file.path;
    await application.save();

    // Make sure ADMIN_EMAIL is defined
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.warn('Admin email not configured');
    } else {
      try {
        // Notify admin
        await sendEmail(
          adminEmail,
          'New Offline Payment Receipt',
          `A new offline payment receipt has been uploaded for application ID: ${applicationId}\n\n` +
          `Applicant Details:\n` +
          `Name: ${application.firstName} ${application.lastName}\n` +
          `Email: ${application.email}\n` +
          `Receipt Path: ${req.file.path}`
        );
      } catch (emailError) {
        console.warn('Failed to send admin notification:', emailError.message);
        // Continue processing even if email fails
      }
    }

    res.status(200).json({ 
      message: 'Receipt uploaded successfully', 
      application 
    });
  } catch (error) {
    console.error('Offline payment error:', error);
    res.status(500).json({ message: error.message });
  }
});

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
    console.error('Get receipt error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 