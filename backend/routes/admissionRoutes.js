const express = require('express');
const router = express.Router();
const storage = require('../services/storage');
const authMiddleware = require('../middleware/auth');

// Public: Submit Admission Form
router.post('/apply', async (req, res) => {
  try {
    const { fullName, fatherName, email, phone, dob, gender, courseId, courseTitle, qualification, address, city } = req.body;
    if (!fullName || !fatherName || !phone || !courseTitle) {
      return res.status(400).json({ success: false, message: 'Please provide all mandatory fields (Name, Father Name, Phone, Course)' });
    }

    const application = await storage.createAdmission({
      fullName,
      fatherName,
      email: email || '',
      phone,
      dob: dob || '',
      gender: gender || 'Male',
      courseId: courseId || '',
      courseTitle,
      qualification: qualification || '12th',
      address: address || '',
      city: city || 'Punjab'
    });

    res.status(201).json({
      success: true,
      message: 'Admission form submitted successfully! Note down your Application ID.',
      applicationId: application.applicationId,
      data: application
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Protected (Admin): List all admissions
router.get('/', authMiddleware, async (req, res) => {
  try {
    const list = await storage.getAdmissions();
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Protected (Admin): Update admission status
router.put('/:applicationId/status', authMiddleware, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updated = await storage.updateAdmissionStatus(req.params.applicationId, status, notes);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
