const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applicationNumber: {
    type: Number,
    required: true
  },
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
  status: {
    type: String,
    enum: ['pending', 'under_review', 'approved', 'rejected', 'payment_pending', 'completed'],
    default: 'under_review'
  },
  rejectionReason: {
    type: String,
    default: null
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  },
  paymentReference: String,
  idCardNumber: String,
  applicationFee: {
    type: Number,
    default: 2000 // Set your application fee amount
  },
  NIN: { type: String, required: true },
  image: { type: String },
  isLatest: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Pre-save middleware to generate application number
applicationSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const latestApp = await this.constructor.findOne({ user: this.user }).sort('-applicationNumber');
      this.applicationNumber = latestApp ? latestApp.applicationNumber + 1 : 1;
      
      // Set previous applications isLatest to false
      await this.constructor.updateMany(
        { user: this.user, _id: { $ne: this._id } },
        { isLatest: false }
      );
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('Application', applicationSchema);