const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');
const Event = require('../models/eventModel');
const Application = require('../models/Application');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');
require('dotenv').config();

const User = require('../models/User');
const nodemailer = require('nodemailer');
const { verifyPayment } = require('../utils/paystack');
const { eventImage, handleUploadError } = require('../middleware/uploadMiddleware');
const multer = require('multer'); // Add multer for file uploads
const { deleteFile } = require('../utils/fileUtils');

// Create a new blog


let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
      tls: {
          rejectUnauthorized: false,
      },
  });
  
  // Utility function to send email
  const sendEmail = async (to, subject, text) => {
    try {
      const mailOptions = {
        from: `"NULLAS NATIONAL"<${process.env.MAIL_FROM_ADDRESS}>`,
        to,
        subject,
        text, // Email body (plain text)
      };
  
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error("Error sending email:", error.message);
      throw new Error("Failed to send email");
    }
  };
  


router.post('/blogs', async (req, res) => {
    try {
        const blog = new Blog({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            postTime: req.body.postTime,
            image: req.body.image,
            author: req.body.author,
            createdAt: req.body.createdAt,
            comments: [], 
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});





router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a blog
router.put('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a blog
router.delete('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// event routes

router.get('/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Delete the image file if it exists
        if (event.image) {
            await deleteFile(event.image.replace(/^\//, '')); // Remove leading slash
        }

        // Delete the event from database
        await event.deleteOne();
        
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/events/:id', async (req, res) => {
    try {
        const updateData = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            category: req.body.category,
            location: req.body.location,
            image: req.body.image
        };

        const event = await Event.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ message: messages.join(', ') });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
});

router.post('/events', async (req, res) => {
    try {
        const eventData = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            category: req.body.category,
            location: req.body.location,
            image: req.body.image
        };

        const event = new Event(eventData);
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ message: messages.join(', ') });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
});

router.get('/events/latest', async (req, res) => {
    try {
        const events = await Event.find()
            .sort({ date: 1 })
            .limit(3);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // This should point to the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Update the apply route to allow multiple applications
router.post('/apply', protect, upload.single('image'), async (req, res) => {
    const { firstName, lastName, phoneNumber, NIN, institution, department, level, matricNumber, address, lgaOfOrigin, stateOfResidence } = req.body;

    try {
        // Check if the file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        // Get the latest application number for this user
        const latestApp = await Application.findOne(
            { user: req.user._id },
            { applicationNumber: 1 }
        ).sort({ applicationNumber: -1 });

        // Ensure applicationNumber is a valid number
        const nextApplicationNumber = (latestApp && typeof latestApp.applicationNumber === 'number') 
            ? latestApp.applicationNumber + 1 
            : 1;

        // Validate that we have a valid number
        if (isNaN(nextApplicationNumber)) {
            throw new Error('Failed to generate valid application number');
        }

        const application = new Application({
            user: req.user._id,
            firstName,
            lastName,
            email: req.user.email,
            phoneNumber,
            NIN,
            institution,
            department,
            level,
            matricNumber,
            address,
            lgaOfOrigin,
            stateOfResidence,
            image: req.file.path,
            applicationNumber: nextApplicationNumber,
            status: 'under_review',
            paymentStatus: 'unpaid'
        });

        const savedApplication = await application.save();

        const order = new Order({
            user: req.user._id,
            application: savedApplication._id,
            paymentStatus: 'unpaid',
            reference: null,
        });

        await order.save();

        // Send confirmation email
        await sendEmail(
            req.user.email,
            'Application Submitted Successfully',
            `Dear ${firstName},\n\nYour application has been submitted successfully. Please proceed with the payment to complete your application process.\n\nBest regards,\nNULLAS Team`
        );

        res.status(201).json({ 
            message: 'Application submitted successfully! Please proceed with payment.', 
            application: savedApplication
        });
    } catch (error) {
        console.error('Application submission error:', error);
        res.status(500).json({ 
            message: error.message || 'Failed to submit application. Please try again.' 
        });
    }
});

// Add an endpoint to check if user has existing application
router.get('/check-application', protect, async (req, res) => {
    try {
        const existingApplication = await Application.findOne({ user: req.user._id });
        res.status(200).json({ 
            hasExistingApplication: !!existingApplication,
            application: existingApplication 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

  router.get('/applications', protect, admin, async (req, res) => {
    try {
      const applications = await Application.find().populate('user');
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.patch('/applications/:id', protect, admin, async (req, res) => {
    const { id } = req.params; // Application ID
    const { status } = req.body;
  
    try {
      // Find the application by ID
      const application = await Application.findById(id);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      // Update application status
      application.status = status;
      await application.save();
  
      // Find the order linked to the application
      const orders = await Order.findOne({ application: _id });
      if (!orders) {
        return res.status(404).json({ message: 'Order not found for this application' });
      }
  
      // If approved and payment is completed, create unique ID and send email
      if (status === 'approved' && orders.paymentStatus === 'paid') {
        console.log(status);
        const uniqueId = `NULLAS-${Date.now()}`;
        await Order.create({
          user: application.user,
          application: application._id,
          uniqueId,
        });
  
        // Send email with unique ID
        await sendEmail(application.email, 'Application Approved', `Your Unique ID: ${uniqueId}`);
      }
  
      res.status(200).json({ message: 'Application status updated!', application });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  
  // User views their orders
  router.get('/orders', protect, async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id }).populate('application');
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

router.post('/verify-payment', protect, async (req, res) => {
    const { reference, applicationId } = req.body;
    try {
      const isValid = await verifyPayment(reference);
      if (!isValid) return res.status(400).json({ message: 'Invalid payment reference' });
  
      const application = await Application.findById(applicationId);
      if (!application) return res.status(404).json({ message: 'Application not found' });
  
      application.paymentReference = reference;
      application.paymentStatus = 'paid';
      await application.save();
  
      res.status(200).json({ message: 'Payment verified and updated!', application });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

router.get('/financials', protect, admin, async (req, res) => {
    try {
        const applications = await Application.find().populate('user');
        const totalIncome = applications.reduce((acc, app) => acc + (app.paymentStatus === 'paid' ? app.amount : 0), 0);
        const pendingPayments = applications.filter(app => app.paymentStatus === 'unpaid').length;

        res.status(200).json({                                             
            totalIncome,
            pendingPayments,
            applications: applications.map(app => ({
                _id: app._id,
                user: app.user,
                firstName: app.firstName,
                lastName: app.lastName,
                email: app.email,
                phoneNumber: app.phoneNumber,
                institution: app.institution,
                department: app.department,
                level: app.level,
                matricNumber: app.matricNumber,
                address: app.address,
                lgaOfOrigin: app.lgaOfOrigin,
                stateOfResidence: app.stateOfResidence,
                status: app.status,
                createdAt: app.createdAt,
                updatedAt: app.updatedAt,
                paymentStatus: app.paymentStatus,
                amount: app.amount
            })),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    
});



module.exports = router;