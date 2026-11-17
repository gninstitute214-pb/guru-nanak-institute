const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateNo: { type: String, required: true, unique: true }, // e.g. "APEX-2026-001"
  rollNo: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  fatherName: { type: String, required: true },
  courseName: { type: String, required: true },
  duration: { type: String, required: true },
  issueDate: { type: String, required: true },
  grade: { type: String, required: true }, // e.g. "A+", "A", "Distinction"
  percentage: { type: Number, required: true },
  verificationStatus: { type: String, default: 'Verified' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', certificateSchema);
