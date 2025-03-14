const Payment = require('../models/Payment');
const Application = require('../models/Application');
const https = require('https');
const axios = require('axios');

const initializePayment = async (req, res) => {
  try {
    const { applicationId } = req.body;
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Create payment initialization data
    const params = JSON.stringify({
      email: application.email,
      amount: 500000, // Amount in kobo (₦5000)
      callback_url: `${process.env.FRONTEND_URL}/payment/verify`,
      reference: `PAY-${Date.now()}-${applicationId}`,
      metadata: {
        application_id: applicationId,
        user_id: req.user._id,
        custom_fields: [
          {
            display_name: "Application Number",
            variable_name: "application_number",
            value: application.applicationNumber
          }
        ]
      }
    });

    // Paystack API request options
    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    // Make request to Paystack
    const paystackRequest = https.request(options, async (paystackRes) => {
      let data = '';

      paystackRes.on('data', (chunk) => {
        data += chunk;
      });

      paystackRes.on('end', async () => {
        const response = JSON.parse(data);
        
        if (response.status) {
          // Save payment attempt to database
          await Payment.create({
            application: applicationId,
            user: req.user._id,
            reference: response.data.reference,
            amount: 5000,
            status: 'pending'
          });

          // Update application status
          application.status = 'payment_initiated';
          await application.save();

          res.json(response.data);
        } else {
          res.status(400).json({ message: 'Payment initialization failed' });
        }
      });
    });

    paystackRequest.on('error', (error) => {
      console.error('Payment initialization error:', error);
      res.status(500).json({ message: 'Payment service error' });
    });

    paystackRequest.write(params);
    paystackRequest.end();

  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body;
    console.log('Verifying payment reference:', reference);

    const verificationResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    console.log('Paystack verification response:', verificationResponse.data);

    if (verificationResponse.data.status && verificationResponse.data.data.status === 'success') {
      // Find payment record
      const payment = await Payment.findOne({ reference });
      
      if (payment) {
        // Update payment status
        payment.status = 'completed';
        payment.paymentDetails = verificationResponse.data.data;
        await payment.save();

        // Update application status
        const application = await Application.findById(payment.application);
        if (application) {
          application.status = 'completed';
          application.paymentStatus = 'paid';
          await application.save();
        }

        return res.status(200).json({
          success: true,
          message: 'Payment verified successfully',
          data: payment
        });
      }
    }

    return res.status(400).json({
      success: false,
      message: 'Payment verification failed'
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
    });
  }
};

module.exports = {
  initializePayment,
  verifyPayment
}; 