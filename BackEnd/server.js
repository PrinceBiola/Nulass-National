const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoose = require('mongoose');
const applicationRoutes = require('./routes/applicationRoutes'); // Adjust the path as necessary
const qrCodeRoutes = require('./routes/qrCodeRoutes');
const { initializeUploadDirs, cleanupOldFiles } = require('./utils/fileUtils');
const adminRoutes = require('./routes/adminRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(bodyParser.json());

app.use('/api', require('./controllers/generalController'));
// app.use('/apis', require('./routes/general'));
app.use('/api/auth', require('./controllers/authController'));
app.use('/api/admin', adminRoutes);
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use("/uploads", express.static("./uploads"));
app.use('/api/applications', applicationRoutes);
app.use('/api/qrcode', qrCodeRoutes);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Initialize upload directories
    await initializeUploadDirs();

    // Schedule cleanup every day at midnight
    setInterval(cleanupOldFiles, 24 * 60 * 60 * 1000);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
