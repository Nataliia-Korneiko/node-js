const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;

// подключение к базе данных MongoDB (к кластеру)
const db = mongoose.connect(MONGO_DB_URL, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', (err) => {
  console.log(`Mongoose connected`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', (err) => {
  console.log(`Mongoose disconnected`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB disconnected and app terminated');
    process.exit(1);
  });
});

module.exports = db;
