const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');
const Event = require('../models/eventModel');
const Application = require('../models/Application');
const Order = require('../models/Order');
// const { verifyPaystackPayment } = require('../utils/paymentUtils');
const { protect, admin } = require('../middleware/authMiddleware');
const { verifyPaystackPayment } = require('../utils/paystack');
// Create a new blog
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







// User applies for ID
router.post('/apply', protect, async (req, res) => {
    const { firstName, lastName, email, phoneNumber, institution, department, level, matricNumber, address, lgaOfOrigin, stateOfResidence } = req.body;
    try {
      const application = await Application.create({
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
  
      req.user.role = 'application_user';
      await req.user.save();
  
      res.status(201).json(application);
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
    const { id } = req.params;
    const { status } = req.body;
    try {
      const application = await Application.findById(id);
      if (!application) return res.status(404).json({ message: 'Application not found' });
  
      application.status = status;
      await application.save();
  
      if (status === 'approved') {
        await Order.create({ user: application.user, application: application._id });
      }
  
      res.status(200).json(application);
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
  
  // Verify payment and update status
  router.post('/verify-payment', protect, async (req, res) => {
    const { reference, applicationId } = req.body;
    try {
      const isValid = await verifyPaystackPayment(reference);
      if (!isValid) return res.status(400).json({ message: 'Invalid payment reference' });
  
      const application = await Application.findById(applicationId);
      if (!application) return res.status(404).json({ message: 'Application not found' });
  
      application.paymentReference = reference;
      application.paymentStatus = 'paid';
      await application.save();
  
      res.status(200).json(application);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


module.exports = router;