const Application = require('../models/Application'); // Adjust the path as necessary
const { sendEmail } = require('../utils/email');

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
}; 