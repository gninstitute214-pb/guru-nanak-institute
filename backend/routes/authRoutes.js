const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const storage = require('../services/storage');
const authMiddleware = require('../middleware/auth');
const { sendOtpEmail } = require('../services/emailService');

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = (process.env.ADMIN_EMAIL || 'gninstitute214@gmail.com').toLowerCase();
    const currentPass = storage.getAdminPassword ? storage.getAdminPassword() : (process.env.ADMIN_PASSWORD || 'Suman@1911');

    const inputEmail = (email || '').trim().toLowerCase();

    if ((inputEmail === adminEmail || inputEmail === 'admin@institute.com') && password === currentPass) {
      const token = jwt.sign(
        { email: inputEmail, role: 'admin' },
        process.env.JWT_SECRET || 'institute_secret_super_key_2026_xyz',
        { expiresIn: '7d' }
      );
      return res.json({
        success: true,
        token,
        user: { name: 'Institute Administrator', email: inputEmail, role: 'admin' }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Check current user session
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'institute_secret_super_key_2026_xyz');
    res.json({ success: true, user: { name: 'Institute Administrator', email: decoded.email, role: 'admin' } });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Forgot Password - Step 1: Send OTP to email
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const adminEmail = (process.env.ADMIN_EMAIL || 'gninstitute214@gmail.com').toLowerCase();

    if (cleanEmail !== adminEmail && cleanEmail !== 'admin@institute.com') {
      return res.status(404).json({ success: false, message: 'This email is not registered as administrator.' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    storage.saveOtp(cleanEmail, otp);

    // Dispatch email
    const emailResult = await sendOtpEmail(cleanEmail, otp);

    if (emailResult.liveEmailSent) {
      return res.json({
        success: true,
        liveEmailSent: true,
        message: `A 6-digit verification code has been sent to ${cleanEmail}. Please check your inbox.`
      });
    }

    // When Gmail SMTP is not configured on server/Vercel
    return res.json({
      success: true,
      liveEmailSent: false,
      otpCode: otp,
      message: `Your 6-digit verification code is: ${otp} (Displayed because Gmail SMTP is not configured yet).`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Reset Password using Registered Institute Mobile (Direct Recovery)
router.post('/reset-with-phone', async (req, res) => {
  try {
    const { phone, newPassword } = req.body;
    if (!phone || !newPassword) {
      return res.status(400).json({ success: false, message: 'Registered mobile number and new password are required.' });
    }

    const cleanInputPhone = phone.toString().replace(/[^0-9]/g, '');
    const registeredPhone = (process.env.INSTITUTE_PHONE || '7355687717').replace(/[^0-9]/g, '');

    if (cleanInputPhone !== registeredPhone && cleanInputPhone !== '7355687717') {
      return res.status(403).json({ success: false, message: 'This mobile number is not registered for administrator recovery.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    storage.setAdminPassword(newPassword);

    res.json({
      success: true,
      message: 'Password reset successfully using registered mobile number! You can now log in.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Forgot Password - Step 2: Verify OTP and reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'Email, OTP, and New Password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const isValid = storage.verifyOtp(cleanEmail, otp);

    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP code. Please request a new code.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    storage.setAdminPassword(newPassword);

    res.json({
      success: true,
      message: 'Password reset successfully! You can now log in with your new password.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Authenticated: Change Password from Dashboard
router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current password and new password are required.' });
    }

    const currentPass = storage.getAdminPassword ? storage.getAdminPassword() : (process.env.ADMIN_PASSWORD || 'Suman@1911');
    if (currentPassword !== currentPass) {
      return res.status(400).json({ success: false, message: 'Current password does not match.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
    }

    storage.setAdminPassword(newPassword);

    res.json({ success: true, message: 'Admin password changed successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
