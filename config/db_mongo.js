const mongoose = require("mongoose");

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb+srv://albertodiezalcobendas:<db_password>@proyectojobapi.8ah9ntt.mongodb.net/?retryWrites=true&w=majority&appName=ProyectoJobApi")
  .then(() => console.log("Now connected to MongoDB!"))
  .catch(err => console.error("Something went wrong", err));

// Exportamos mongoose para poder usarlo en otros archivos
module.exports = mongoose;


