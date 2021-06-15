const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;

// подключение к базе данных MongoDB (к кластеру)
const db = new MongoClient.connect(MONGO_DB_URL, {
  useUnifiedTopology: true,
  poolSize: 5,
});

process.on('SIGINT', async () => {
  const client = await db;
  client.close();
  console.log('Connection for DB disconnected and app terminated');
  process.exit();
});

module.exports = db;
