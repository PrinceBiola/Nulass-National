const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { protect, admin } = require('../middleware/authMiddleware');
const { sendEmail } = require('../utils/email');
const excel = require('exceljs');

// Get all applications
router.get('/applications',   async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('user', 'email')
      .sort('-createdAt');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update application status
router.patch('/applications/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, rejectionReason } = req.body;

  try {
    const application = await Application.findById(id).populate('user', 'email');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Only update the status and rejection reason
    const updateData = { status };
    if (rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: false } // Disable validation for the update
    );

    // Send email notification
    let emailSubject, emailText;
    if (status === 'approved') {
      emailSubject = 'Application Approved';
      emailText = `Dear ${application.firstName},\n\nYour application has been approved. You can now proceed to generate your student ID.\n\nBest regards,\nNULLAS Team`;
    } else if (status === 'rejected') {
      emailSubject = 'Application Rejected';
      emailText = `Dear ${application.firstName},\n\nYour application has been rejected for the following reason:\n${rejectionReason}\n\nPlease address the issues and resubmit your application.\n\nBest regards,\nNULLAS Team`;
    }

    if (emailSubject && emailText) {
      await sendEmail(application.email, emailSubject, emailText);
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ message: error.message });
  }
});

// Export applications to Excel
router.get('/applications/export', protect, admin, async (req, res) => {
  try {
    const applications = await Application.find().populate('user', 'email');
    
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Applications');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Institution', key: 'institution', width: 30 },
      { header: 'Department', key: 'department', width: 30 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Payment Status', key: 'paymentStatus', width: 15 },
      { header: 'Submitted Date', key: 'createdAt', width: 20 },
    ];

    applications.forEach(app => {
      worksheet.addRow({
        name: `${app.firstName} ${app.lastName}`,
        email: app.email,
        institution: app.institution,
        department: app.department,
        status: app.status,
        paymentStatus: app.paymentStatus,
        createdAt: app.createdAt.toLocaleDateString(),
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=applications.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get application statistics
router.get('/applications/stats', protect, admin, async (req, res) => {
  try {
    const stats = await Application.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          approved: {
            $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] }
          },
          rejected: {
            $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] }
          },
          paid: {
            $sum: { $cond: [{ $eq: ['$paymentStatus', 'paid'] }, 1, 0] }
          },
          unpaid: {
            $sum: { $cond: [{ $eq: ['$paymentStatus', 'unpaid'] }, 1, 0] }
          }
        }
      }
    ]);

    res.status(200).json(stats[0] || {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      paid: 0,
      unpaid: 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 