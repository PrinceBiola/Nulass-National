const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
  paymentStatus: { type: String, default: 'unpaid', enum: ['unpaid', 'paid'] },
  reference: { type: String },
  uniqueId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);