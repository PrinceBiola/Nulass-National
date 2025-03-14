const Application = require('../models/Application'); // Adjust the path as necessary
const { sendEmail } = require('../utils/email');
const axios = require('axios');
const Payment = require('../models/Payment');
const { generateMembershipCard } = require('../utils/cardGenerator');

// Get user's latest application
const getUserApplication = async (req, res) => {
  try {
    const application = await Application.findOne({ 
      user: req.user._id,
      isLatest: true 
    }).sort('-createdAt');

    if (!application) {
      return res.status(404).json({ message: 'No application found' });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error('Error fetching user application:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's application history
const getUserApplicationHistory = async (req, res) => {
  try {
    const applications = await Application.find({ 
      user: req.user._id 
    }).sort('-createdAt');
    
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching application history:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new application
const createApplication = async (req, res) => {
  try {
    // Create new application without checking for existing ones
    const application = new Application({
      ...req.body,
      user: req.user._id,
      status: 'under_review',
      rejectionReason: null // Clear any previous rejection reason
    });
    
    const savedApplication = await application.save();

    // Send confirmation email
    try {
      const emailSubject = 'Application Submitted - NULASS';
      const emailText = `Dear ${savedApplication.firstName},\n\nYour application has been successfully submitted and is now under review. You will be notified once there are any updates.\n\nApplication ID: ${savedApplication._id}\n\nBest regards,\nNULASS Team`;
      
      await sendEmail(savedApplication.email, emailSubject, emailText);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Continue processing even if email fails
    }

    res.status(201).json(savedApplication);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(400).json({ 
      message: error.message || 'Failed to create application. Please try again.' 
    });
  }
};

// Get all applications
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('user', 'name email')
      .sort('-createdAt');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single application
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('user', 'name email');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update application
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete application
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Update status
    application.status = status;
    
    // If approved, set to payment_pending
    if (status === 'approved') {
      application.status = 'payment_pending';
    }

    // If rejected, add rejection reason
    if (status === 'rejected') {
      application.rejectionReason = rejectionReason || 'Application rejected by administrator';
      application.status = 'rejected';
    }

    await application.save();

    // Send email notification to user
    try {
      const emailSubject = status === 'approved' 
        ? 'Application Approved - NULASS'
        : 'Application Status Update - NULASS';
        
      const emailText = status === 'approved'
        ? `Dear ${application.firstName},\n\nYour application has been approved. Please log in to your dashboard to proceed with the payment and generate your ID card.`
        : `Dear ${application.firstName},\n\nYour application has been ${status}. ${rejectionReason ? `\n\nReason: ${rejectionReason}` : ''}`;

      await sendEmail(application.email, emailSubject, emailText);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Continue processing even if email fails
    }

    res.status(200).json(application);
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(400).json({ message: error.message });
  }
};

// Verify payment and update status
const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Verify payment with Paystack (implement your payment verification logic)
    const isPaymentValid = await verifyPaystackPayment(reference);

    if (isPaymentValid) {
      application.paymentStatus = 'paid';
      application.status = 'completed';
      application.idCardNumber = `NULASS${Date.now().toString().slice(-8)}`;
      await application.save();
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all applications (admin only)
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .sort('-createdAt')
      .populate('user', 'name email');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const initializePayment = async (req, res) => {
  try {
    const { applicationId } = req.body;
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Create payment initialization data
    const paymentData = {
      email: application.email,
      amount: "500000", // Amount in kobo (₦5000)
      currency: "NGN",
      callback_url: `${process.env.FRONTEND_URL}/payment/verify`,
      reference: `PAY-${Date.now()}-${applicationId}`,
      metadata: {
        application_id: applicationId,
        user_id: req.user._id,
        application_number: application.applicationNumber
      }
    };

    try {
      // Log the request data for debugging
      console.log('Paystack Request Data:', {
        url: 'https://api.paystack.co/transaction/initialize',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
        paymentData
      });

      const response = await axios({
        method: 'post',
        url: 'https://api.paystack.co/transaction/initialize',
        data: paymentData,
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      // Log the response for debugging
      console.log('Paystack Response:', response.data);

      if (response.data.status) {
        // Save payment attempt to database
        await Payment.create({
          application: applicationId,
          user: req.user._id,
          reference: response.data.data.reference,
          amount: 5000,
          status: 'pending'
        });

        // Update application status
        application.status = 'payment_initiated';
        await application.save();

        return res.status(200).json(response.data);
      } else {
        console.error('Paystack Error Response:', response.data);
        return res.status(400).json({ message: 'Payment initialization failed' });
      }
    } catch (error) {
      console.error('Paystack API Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      return res.status(500).json({ 
        message: 'Payment service error',
        details: error.response?.data?.message || error.message
      });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const generateMemberCard = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.status !== 'completed' || application.paymentStatus !== 'paid') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    const doc = await generateMembershipCard(application);

    // Set response headers for PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=membership-card-${application.applicationNumber}.pdf`);

    // Pipe the PDF document to the response
    doc.pipe(res);
    doc.end();

  } catch (error) {
    console.error('Error generating card:', error);
    res.status(500).json({ message: 'Error generating membership card' });
  }
};

const verifyPaymentCallback = async (req, res) => {
  try {
    const { reference } = req.body;

    // Verify payment with Paystack
    const verificationResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
      }
    );

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

          // Send confirmation email
          try {
            await sendEmail(
              application.email,
              'NULASS Membership Payment Confirmed',
              `Dear ${application.firstName},\n\nYour payment has been confirmed and your membership is now active. You can now download your membership card from the dashboard.\n\nBest regards,\nNULASS Team`
            );
          } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
          }
        }

        return res.status(200).json({ status: 'success' });
      }
    }

    res.status(400).json({ status: 'failed' });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ message: 'Error verifying payment' });
  }
};

const getMembershipStatus = async (req, res) => {
  try {
    const application = await Application.findOne({ 
      user: req.user._id,
      isLatest: true
    });

    if (!application) {
      return res.status(404).json({ message: 'No application found' });
    }

    const membershipStatus = {
      isActive: application.status === 'completed' && application.paymentStatus === 'paid',
      applicationNumber: application.applicationNumber,
      memberSince: application.createdAt,
      expiryDate: new Date(application.createdAt.getTime() + (365 * 24 * 60 * 60 * 1000)), // 1 year from creation
      status: application.status,
      paymentStatus: application.paymentStatus
    };

    res.status(200).json(membershipStatus);
  } catch (error) {
    console.error('Error fetching membership status:', error);
    res.status(500).json({ message: 'Error fetching membership status' });
  }
};

module.exports = {
  getUserApplication,
  getUserApplicationHistory,
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  updateApplicationStatus,
  verifyPayment,
  getAllApplications,
  initializePayment,
  generateMemberCard,
  verifyPaymentCallback,
  getMembershipStatus
}; 