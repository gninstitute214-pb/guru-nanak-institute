const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  courseInterested: { type: String, default: 'General' },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
