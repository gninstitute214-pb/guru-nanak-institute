const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = (process.env.ADMIN_EMAIL || 'gninstitute214@gmail.com').toLowerCase();
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

    const inputEmail = (email || '').trim().toLowerCase();

    if ((inputEmail === adminEmail || inputEmail === 'admin@institute.com') && password === adminPass) {
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
      message: 'Invalid credentials. Use: gninstitute214@gmail.com / admin123'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

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

module.exports = router;
