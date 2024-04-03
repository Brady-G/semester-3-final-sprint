const { MongoClient } = require('mongodb');
require('dotenv').config()

const client = new MongoClient(process.env.MONGO_URL);

module.exports = client;