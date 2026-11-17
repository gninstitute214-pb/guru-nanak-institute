const express = require('express');
const router = express.Router();
const storage = require('../services/storage');
const authMiddleware = require('../middleware/auth');

// Public: Verify Certificate by Certificate No. or Roll No.
router.get('/verify/:identifier', async (req, res) => {
  try {
    const cert = await storage.findCertificate(req.params.identifier);
    if (!cert) {
      return res.status(404).json({
        success: false,
        message: 'No record found with this Certificate No. or Roll No. Please verify and try again.'
      });
    }

    res.json({
      success: true,
      message: 'Certificate verified successfully!',
      data: cert
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Protected (Admin): Get all certificates
router.get('/', authMiddleware, async (req, res) => {
  try {
    const certs = await storage.getCertificates();
    res.json({ success: true, count: certs.length, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Protected (Admin): Issue new certificate
router.post('/issue', authMiddleware, async (req, res) => {
  try {
    const { studentName, fatherName, courseName, duration, issueDate, grade, percentage, rollNo, certificateNo } = req.body;
    if (!studentName || !courseName || !rollNo) {
      return res.status(400).json({ success: false, message: 'Student Name, Course, and Roll No are required.' });
    }

    const genCertNo = certificateNo || ('APEX-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900));

    // Check duplicate
    const existing = await storage.findCertificate(genCertNo);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Certificate or Roll number already exists!' });
    }

    const newCert = await storage.createCertificate({
      certificateNo: genCertNo,
      rollNo: rollNo.toString(),
      studentName,
      fatherName: fatherName || '',
      courseName,
      duration: duration || '6 Months',
      issueDate: issueDate || new Date().toISOString().split('T')[0],
      grade: grade || 'A',
      percentage: Number(percentage) || 85,
      verificationStatus: 'Verified'
    });

    res.status(201).json({ success: true, message: 'Certificate issued successfully!', data: newCert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Protected (Admin): Delete certificate
router.delete('/:certificateNo', authMiddleware, async (req, res) => {
  try {
    await storage.deleteCertificate(req.params.certificateNo);
    res.json({ success: true, message: 'Certificate deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
