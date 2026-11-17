const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const storage = require('../services/storage');
const authMiddleware = require('../middleware/auth');
const { sendOtpEmail } = require('../services/emailService');

// Brute Force Protection: Lockout after 5 failed attempts
const loginAttempts = new Map(); // clientKey -> { count, lockedUntil }

const checkRateLimit = (key) => {
  const record = loginAttempts.get(key);
  if (!record) return { allowed: true };
  if (record.lockedUntil && Date.now() < record.lockedUntil) {
    const remainingMins = Math.ceil((record.lockedUntil - Date.now()) / 60000);
    return { allowed: false, remainingMins };
  }
  return { allowed: true };
};

const recordFailedAttempt = (key) => {
  const record = loginAttempts.get(key) || { count: 0, lockedUntil: null };
  record.count += 1;
  if (record.count >= 5) {
    record.lockedUntil = Date.now() + 15 * 60 * 1000; // 15 minute lock
    record.count = 0;
  }
  loginAttempts.set(key, record);
};

const recordSuccessfulLogin = (key) => {
  loginAttempts.delete(key);
};

// Admin Login - Secure Endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = (process.env.ADMIN_EMAIL || 'gninstitute214@gmail.com').toLowerCase().trim();
    const currentPass = storage.getAdminPassword ? storage.getAdminPassword() : (process.env.ADMIN_PASSWORD || 'Suman@1911');

    const inputEmail = (email || '').trim().toLowerCase();
    const clientKey = req.ip || req.headers['x-forwarded-for'] || inputEmail || 'unknown_client';

    // Rate Limit Check
    const rateCheck = checkRateLimit(clientKey);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        success: false,
        message: `Security Lock: Too many failed login attempts. Please try again after ${rateCheck.remainingMins} minute(s).`
      });
    }

    // STRICT AUTHENTICATION: Only gninstitute214@gmail.com + active admin password
    if (inputEmail === adminEmail && password === currentPass) {
      recordSuccessfulLogin(clientKey);

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

    // Record failure
    recordFailedAttempt(clientKey);

    return res.status(401).json({
      success: false,
      message: 'Access Denied: Invalid email address or password.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Authentication error: ' + err.message });
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

// Authenticated Password Change (Used inside Admin Dashboard)
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
