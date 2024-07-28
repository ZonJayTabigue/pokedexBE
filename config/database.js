const mongoose = require('mongoose');
require('dotenv').config();

let isConnected;

const connectDB = async (db_name) => {

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`);
    isConnected = mongoose.connection.readyState;
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};

const closeDB = async () => {
  if (!isConnected) {
    console.log('MongoDB is not connected');
    return;
  }

  try {
    await mongoose.connection.close();
    isConnected = false;
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error closing MongoDB connection:', err.message);
  }
};

module.exports = { connectDB, closeDB };
