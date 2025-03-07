const axios = require('axios');
const Application = require('../models/Application');

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

exports.initializePayment = async (req, res) => {
  try {
    const { email, amount, metadata } = req.body;

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount,
        metadata
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Payment initialization failed:', error);
    res.status(500).json({ message: 'Failed to initialize payment' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
        }
      }
    );

    if (response.data.data.status === 'success') {
      const { applicationId } = response.data.data.metadata;
      
      // Update application status
      const application = await Application.findById(applicationId);
      if (application) {
        application.status = 'completed';
        application.paymentStatus = 'paid';
        application.paymentReference = reference;
        application.idCardNumber = `NULASS${Date.now().toString().slice(-8)}`;
        await application.save();
      }

      res.status(200).json({ success: true, application });
    } else {
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Payment verification failed:', error);
    res.status(500).json({ message: 'Failed to verify payment' });
  }
}; 