const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  applicationId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
  courseId: { type: String, required: true },
  courseTitle: { type: String, required: true },
  qualification: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admission', admissionSchema);
