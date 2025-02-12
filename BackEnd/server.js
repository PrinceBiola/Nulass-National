const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoose = require('mongoose');
const applicationRoutes = require('./routes/applicationRoutes'); // Adjust the path as necessary

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/api', require('./controllers/generalController'));
// app.use('/apis', require('./routes/general'));
app.use('/api/auth', require('./controllers/authController'));
app.use('/api/admin', require('./controllers/adminController'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use("/uploads", express.static("./uploads"));
app.use('/api/applications', applicationRoutes);

// Connect to MongoDB
mongoose.connect('your_mongo_db_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
