const Application = require('../models/Application'); // Adjust the path as necessary

// Controller to get user application by ID
const getUserApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    console.log('Fetching application with ID:', applicationId); // Log the ID
    const application = await Application.findById(applicationId).populate('user'); // Populate user if needed

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new application
const createApplication = async (req, res) => {
  try {
    const application = new Application({
      ...req.body,
      user: req.user._id
    });
    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
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

// Controller to upload payment receipt
const uploadPaymentReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Receipt file is required' });
    }

    const application = await Application.findByIdAndUpdate(
      req.body.applicationId,
      {
        receipt: `/uploads/receipts/${req.file.filename}`,
        paymentStatus: 'pending_verification'
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to review payment
const reviewPayment = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: req.body.status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Application.find()
      .select('paymentStatus receipt user createdAt')
      .populate('user', 'name email');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to confirm payment
const confirmPayment = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.paymentId,
      { paymentStatus: 'confirmed' },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUserApplication,
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  uploadPaymentReceipt,
  reviewPayment,
  getAllPayments,
  confirmPayment,
}; 