if (!process.env.DOCKERIZED) {
  require('dotenv').config();
}

const mongoose = require ('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  };

  const DB_URI = process.env.MONGO_URI ||
                 'mongodb://localhost:27017/toDoList?retryWrites=true&w=majority';

  try {
    await mongoose.connect(DB_URI, connectionOptions);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

function maskPassword(uri) {
  return uri.replace(process.env.MONGO_PASSWORD, '***');
}

module.exports = connectDB;