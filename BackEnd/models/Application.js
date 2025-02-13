const mongoose = require('mongoose');

const ApplicationSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  NIN: { type: Number, required: false },
  institution: { type: String, required: true },
  department: { type: String, required: true },
  level: { type: Number, required: true },
  matricNumber: { type: Number, required: true },
  address: { type: String, required: true },
  lgaOfOrigin: { type: String, required: true },
  stateOfResidence: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },
  paymentStatus: { type: String, enum: ['paid', 'unpaid', 'pending_verification'], default: 'unpaid' },
  paymentReference: String,
  paymentReceipt: String,
  rejectionReason: String,
  image: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);