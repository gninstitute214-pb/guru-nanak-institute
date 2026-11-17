const express = require('express');
const router = express.Router();
const storage = require('../services/storage');
const authMiddleware = require('../middleware/auth');

// Public: Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await storage.getCourses();
    res.json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Public: Get course by code
router.get('/:code', async (req, res) => {
  try {
    const course = await storage.getCourseByCode(req.params.code);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Protected (Admin): Create course
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, code, category, duration, fee, description, syllabus, eligibility, highlights, badge } = req.body;
    if (!title || !code || !duration || !fee) {
      return res.status(400).json({ success: false, message: 'Title, code, duration, and fee are required.' });
    }

    const created = await storage.createCourse({
      title,
      code: code.toUpperCase(),
      category: category || 'General',
      duration,
      fee: Number(fee),
      description: description || '',
      syllabus: Array.isArray(syllabus) ? syllabus : (syllabus ? syllabus.split('\n').filter(Boolean) : []),
      eligibility: eligibility || '10th / 12th Pass',
      highlights: Array.isArray(highlights) ? highlights : (highlights ? highlights.split(',').map(s => s.trim()) : []),
      badge: badge || 'New'
    });

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Protected (Admin): Update course
router.put('/:code', authMiddleware, async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.fee !== undefined) {
      updateData.fee = Number(updateData.fee);
    }
    if (updateData.syllabus !== undefined && typeof updateData.syllabus === 'string') {
      updateData.syllabus = updateData.syllabus.split('\n').map(s => s.trim()).filter(Boolean);
    }
    if (updateData.highlights !== undefined && typeof updateData.highlights === 'string') {
      updateData.highlights = updateData.highlights.split(',').map(s => s.trim()).filter(Boolean);
    }

    const updated = await storage.updateCourse(req.params.code, updateData);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Protected (Admin): Delete course
router.delete('/:code', authMiddleware, async (req, res) => {
  try {
    await storage.deleteCourse(req.params.code);
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
