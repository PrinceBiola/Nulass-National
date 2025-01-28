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

// Fetch a single blog
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
        const events = await Event.find();
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


router.put('/events/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/events/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/events', async (req, res) => {
    try {
        const event = new Event({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            date: req.body.date,
            location: req.body.location,
            createdAt: req.body.createdAt,
            image: req.body.image,
            author: req.body.author,
        });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
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

// router.post('/apply', protect, async (req, res) => {
//     const { firstName, lastName, email, phoneNumber, institution, department, level, matricNumber, address, lgaOfOrigin, stateOfResidence } = req.body;
//     try {
//       const application = await Application.create({
//         user: req.user._id,
//         firstName,
//         lastName,
//         email,
//         phoneNumber,
//         institution,
//         department,
//         level,
//         matricNumber,
//         address,
//         lgaOfOrigin,
//         stateOfResidence,
//       });
  
//       req.user.role = 'application_user';
//       await req.user.save();
  
//       res.status(201).json(application);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

router.post('/apply', protect, async (req, res) => {
    const { firstName, lastName, email, phoneNumber, institution, department, level, matricNumber, address, lgaOfOrigin, stateOfResidence } = req.body;
  
    try {
      // Create a new application
      const application = new Application({
        user: req.user._id,
        firstName,
        lastName,
        email,
        phoneNumber,
        institution,
        department,
        level,
        matricNumber,
        address,
        lgaOfOrigin,
        stateOfResidence,
      });
  
      // Save the application
      await application.save();
  
      // Create an order with payment status 'unpaid'
      const order = new Order({
        user: req.user._id,
        application: application._id, // link the order to the application
        paymentStatus: 'unpaid', // default payment status
        reference: null, // Placeholder for now, to be filled after payment verification
      });
  
      // Save the order
      await order.save();
  
      res.status(201).json({ message: 'Application and order created successfully!', application });
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
  


module.exports = router;