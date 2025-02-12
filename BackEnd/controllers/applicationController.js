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

const createApplication = async (req, res) => {
  try {
    const newApplication = new Application({
      user: req.body.user,
      // Add other fields as necessary
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserApplication,
  createApplication,
}; 