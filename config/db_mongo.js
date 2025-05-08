// config/db_mongo.js
const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/scraping_ads";
console.log(MONGODB_URI);

module.exports = async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado a la base:", mongoose.connection.name);
  } catch (err) {
    console.error("Error conectando a MongoDB:", err);
    process.exit(1);
  }
};
