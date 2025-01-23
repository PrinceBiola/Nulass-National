const mongoose = require('mongoose');

const ApplicationSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  institution: { type: String, required: true },
  department: { type: String, required: true },
  level: { type: String, required: true },
  matricNumber: { type: String, required: true },
  address: { type: String, required: true },
  lgaOfOrigin: { type: String, required: true },
  stateOfResidence: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);