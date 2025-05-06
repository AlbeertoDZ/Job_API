require("dotenv").config();
const mongoose = require("mongoose");

// Conexión a la base de datos MongoDB
mongoose
  .connect("mongodb://localhost:27017/jobin-app")
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));

// Exportamos mongoose para poder usarlo en otros archivos
module.exports = mongoose;
