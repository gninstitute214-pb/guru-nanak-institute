const express = require('express');
const router = express.Router();
const storage = require('../services/storage');
const authMiddleware = require('../middleware/auth');

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const courses = await storage.getCourses();
    const admissions = await storage.getAdmissions();
    const certs = await storage.getCertificates();
    const inquiries = await storage.getInquiries();

    const pendingAdmissions = admissions.filter(a => a.status === 'Pending').length;
    const approvedAdmissions = admissions.filter(a => a.status === 'Approved').length;
    const newInquiries = inquiries.filter(i => i.status === 'New').length;

    res.json({
      success: true,
      data: {
        totalCourses: courses.length,
        totalAdmissions: admissions.length,
        pendingAdmissions,
        approvedAdmissions,
        totalCertificates: certs.length,
        totalInquiries: inquiries.length,
        newInquiries
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
