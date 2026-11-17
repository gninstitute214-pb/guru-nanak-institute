const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  category: { type: String, required: true }, // e.g. "Software", "Accounting", "Basics", "Design"
  duration: { type: String, required: true }, // e.g. "6 Months", "1 Year"
  fee: { type: Number, required: true },
  description: { type: String, required: true },
  syllabus: [{ type: String }],
  eligibility: { type: String, default: '10th / 12th Pass' },
  highlights: [{ type: String }],
  badge: { type: String, default: 'Popular' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
