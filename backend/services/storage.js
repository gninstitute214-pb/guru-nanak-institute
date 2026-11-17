const fs = require('fs');
const path = require('path');
const { getIsConnected } = require('../config/db');
const Course = require('../models/Course');
const Admission = require('../models/Admission');
const Certificate = require('../models/Certificate');
const Inquiry = require('../models/Inquiry');
const { initialCourses, initialCertificates, initialAdmissions, initialInquiries } = require('../data/seedData');

const storeFilePath = path.join(__dirname, '..', 'data', 'store.json');

const initJsonStore = () => {
  if (!fs.existsSync(path.dirname(storeFilePath))) {
    fs.mkdirSync(path.dirname(storeFilePath), { recursive: true });
  }
  if (!fs.existsSync(storeFilePath)) {
    const defaultData = {
      courses: initialCourses,
      certificates: initialCertificates,
      admissions: initialAdmissions,
      inquiries: initialInquiries
    };
    fs.writeFileSync(storeFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
};

initJsonStore();

const readStore = () => {
  try {
    initJsonStore();
    const data = fs.readFileSync(storeFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading store.json:', err);
    return { courses: [], certificates: [], admissions: [], inquiries: [] };
  }
};

const writeStore = (data) => {
  try {
    fs.writeFileSync(storeFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing store.json:', err);
  }
};

// Seed MongoDB if connected and empty
const seedMongoDBIfNeeded = async () => {
  if (!getIsConnected()) return;
  try {
    const count = await Course.countDocuments();
    if (count === 0) {
      console.log('[Seed] Seeding default courses into MongoDB...');
      await Course.insertMany(initialCourses);
      await Certificate.insertMany(initialCertificates);
      await Admission.insertMany(initialAdmissions);
      console.log('[Seed] Default courses and data seeded to MongoDB!');
    }
  } catch (err) {
    console.error('[Seed Error]:', err.message);
  }
};

// Data Layer APIs
const storage = {
  seedMongoDBIfNeeded,

  // COURSES
  async getCourses() {
    if (getIsConnected()) {
      return await Course.find().sort({ createdAt: -1 });
    }
    const store = readStore();
    return store.courses;
  },

  async getCourseByCode(code) {
    if (getIsConnected()) {
      return await Course.findOne({ code });
    }
    const store = readStore();
    return store.courses.find(c => c.code === code || c._id === code);
  },

  async createCourse(courseData) {
    if (getIsConnected()) {
      const course = new Course(courseData);
      return await course.save();
    }
    const store = readStore();
    const newCourse = { ...courseData, _id: 'course_' + Date.now(), createdAt: new Date().toISOString() };
    store.courses.unshift(newCourse);
    writeStore(store);
    return newCourse;
  },

  async updateCourse(code, updateData) {
    if (getIsConnected()) {
      return await Course.findOneAndUpdate({ code }, updateData, { new: true });
    }
    const store = readStore();
    const idx = store.courses.findIndex(c => c.code === code || c._id === code);
    if (idx !== -1) {
      store.courses[idx] = { ...store.courses[idx], ...updateData };
      writeStore(store);
      return store.courses[idx];
    }
    return null;
  },

  async deleteCourse(code) {
    if (getIsConnected()) {
      return await Course.findOneAndDelete({ code });
    }
    const store = readStore();
    store.courses = store.courses.filter(c => c.code !== code && c._id !== code);
    writeStore(store);
    return true;
  },

  // CERTIFICATES
  async getCertificates() {
    if (getIsConnected()) {
      return await Certificate.find().sort({ createdAt: -1 });
    }
    const store = readStore();
    return store.certificates;
  },

  async findCertificate(identifier) {
    const cleanId = (identifier || '').trim().toUpperCase();
    if (getIsConnected()) {
      return await Certificate.findOne({
        $or: [
          { certificateNo: new RegExp(`^${cleanId}$`, 'i') },
          { rollNo: new RegExp(`^${cleanId}$`, 'i') }
        ]
      });
    }
    const store = readStore();
    return store.certificates.find(
      c => c.certificateNo.toUpperCase() === cleanId || c.rollNo.toUpperCase() === cleanId
    );
  },

  async createCertificate(certData) {
    if (getIsConnected()) {
      const cert = new Certificate(certData);
      return await cert.save();
    }
    const store = readStore();
    const newCert = { ...certData, _id: 'cert_' + Date.now(), createdAt: new Date().toISOString() };
    store.certificates.unshift(newCert);
    writeStore(store);
    return newCert;
  },

  async deleteCertificate(certificateNo) {
    if (getIsConnected()) {
      return await Certificate.findOneAndDelete({ certificateNo });
    }
    const store = readStore();
    store.certificates = store.certificates.filter(c => c.certificateNo !== certificateNo);
    writeStore(store);
    return true;
  },

  // ADMISSIONS
  async getAdmissions() {
    if (getIsConnected()) {
      return await Admission.find().sort({ createdAt: -1 });
    }
    const store = readStore();
    return store.admissions;
  },

  async createAdmission(admissionData) {
    const applicationId = 'APP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const fullData = { ...admissionData, applicationId };

    if (getIsConnected()) {
      const adm = new Admission(fullData);
      return await adm.save();
    }
    const store = readStore();
    const newAdmission = { ...fullData, _id: 'adm_' + Date.now(), status: 'Pending', createdAt: new Date().toISOString() };
    store.admissions.unshift(newAdmission);
    writeStore(store);
    return newAdmission;
  },

  async updateAdmissionStatus(applicationId, status, notes) {
    if (getIsConnected()) {
      return await Admission.findOneAndUpdate(
        { applicationId },
        { status, ...(notes !== undefined ? { notes } : {}) },
        { new: true }
      );
    }
    const store = readStore();
    const idx = store.admissions.findIndex(a => a.applicationId === applicationId || a._id === applicationId);
    if (idx !== -1) {
      store.admissions[idx].status = status;
      if (notes !== undefined) store.admissions[idx].notes = notes;
      writeStore(store);
      return store.admissions[idx];
    }
    return null;
  },

  // INQUIRIES
  async getInquiries() {
    if (getIsConnected()) {
      return await Inquiry.find().sort({ createdAt: -1 });
    }
    const store = readStore();
    return store.inquiries;
  },

  async createInquiry(inquiryData) {
    if (getIsConnected()) {
      const inq = new Inquiry(inquiryData);
      return await inq.save();
    }
    const store = readStore();
    const newInquiry = { ...inquiryData, id: 'inq_' + Date.now(), status: 'New', createdAt: new Date().toISOString() };
    store.inquiries.unshift(newInquiry);
    writeStore(store);
    return newInquiry;
  },

  async updateInquiryStatus(id, status) {
    if (getIsConnected()) {
      return await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    }
    const store = readStore();
    const idx = store.inquiries.findIndex(i => i.id === id || i._id === id);
    if (idx !== -1) {
      store.inquiries[idx].status = status;
      writeStore(store);
      return store.inquiries[idx];
    }
    return null;
  }
};

module.exports = storage;
