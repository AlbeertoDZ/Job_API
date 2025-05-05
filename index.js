require('dotenv').config();// Cargar variables de entorno

const express = require("express");
const app = express();

//const mongoose = require("mongoose");


//const apiRoutes = require("./routes/api.routes");
const userRoutes = require("./routes/users.routes");
const adminRoutes = require("./routes/admin.routes");
const offerRoutes = require("./routes/offer.routes");

//Middleware Morgan
const morgan = require("./middlewares/morgan");

// Logger
app.use(express.static("public")); // Middleware para servir archivos estáticos de front

// Para poder leer JSON en las peticiones
app.use(express.json());

//app.use("/api", apiRoutes); //siempre con prefijo api
app.use("/api", offerRoutes); //Rutas ofertas de trabajo
app.use("/", userRoutes); //Rutas de usuarios
app.use("/admin", adminRoutes); //Rutas de admin

// Configuración de vistas PUG - Motor de plantillas
app.set("view engine", "pug");
app.set("views", "./views");

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Hola, servidor en http://localhost:${PORT}`);
});