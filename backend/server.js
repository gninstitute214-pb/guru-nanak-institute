require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const storage = require('./services/storage');

const courseRoutes = require('./routes/courseRoutes');
const admissionRoutes = require('./routes/admissionRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const authRoutes = require('./routes/authRoutes');
const statRoutes = require('./routes/statRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stats', statRoutes);

// Health check & Info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    institute: process.env.INSTITUTE_NAME || 'Guru Nanak Institute of Computer Education',
    time: new Date().toISOString()
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  await storage.seedMongoDBIfNeeded();

  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 Institute Backend API running on port ${PORT}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🎓 Admin login: ${process.env.ADMIN_EMAIL || 'gninstitute214@gmail.com'} / ${process.env.ADMIN_PASSWORD || 'Suman@1911'}`);
    console.log(`===============================================`);
  });
};

if (!process.env.VERCEL) {
  startServer();
} else {
  connectDB();
}

module.exports = app;
