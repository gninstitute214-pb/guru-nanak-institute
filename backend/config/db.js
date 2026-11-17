const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/institute_db', {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to local/cloud MongoDB: ${error.message}`);
    console.log('[Data Store] Running in resilient fallback mode (Local JSON storage). You can provide a MongoDB URI in backend/.env anytime.');
    isConnected = false;
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
