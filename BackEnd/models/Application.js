const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  NIN: {
    type: String,
    required: false
  },
  institution: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  matricNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  lgaOfOrigin: {
    type: String,
    required: true
  },
  stateOfResidence: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'unpaid'],
    default: 'unpaid'
  },
  paymentReference: String,
  rejectionReason: String,
  image: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema);