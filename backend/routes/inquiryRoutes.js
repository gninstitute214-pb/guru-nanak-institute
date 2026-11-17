const express = require('express');
const router = express.Router();
const storage = require('../services/storage');
const authMiddleware = require('../middleware/auth');
const { sendInquiryEmail } = require('../services/emailService');

// Public: Submit inquiry
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, courseInterested, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Name, phone number, and message are required.' });
    }

    const inquiry = await storage.createInquiry({
      name,
      phone,
      email: email || '',
      courseInterested: courseInterested || 'General Inquiry',
      message
    });

    // Send email notification to gninstitute214@gmail.com
    await sendInquiryEmail({
      name,
      phone,
      email,
      courseInterested,
      message
    });

    res.status(201).json({
      success: true,
      message: 'ਤੁਹਾਡਾ ਸੁਨੇਹਾ ਪ੍ਰਾਪਤ ਹੋ ਗਿਆ ਹੈ! ਸਾਡੀ ਟੀਮ (gninstitute214@gmail.com) ਜਲਦੀ ਸੰਪਰਕ ਕਰੇਗੀ।',
      data: inquiry
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Protected: Get all inquiries
router.get('/', authMiddleware, async (req, res) => {
  try {
    const inquiries = await storage.getInquiries();
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Protected: Update inquiry status
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const updated = await storage.updateInquiryStatus(req.params.id, req.body.status);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
