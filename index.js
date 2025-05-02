const express = require("express");
const app = express();
const apiRoutes = require("./routes/api.routes");
const webRoutes = require("./routes/web.routes");

//Middleware Morgan
const morgan = require("./middlewares/morgan");

// Logger
app.use(express.static("public")); // Middleware para servir archivos estáticos de front

// Para poder leer JSON en las peticiones
app.use(express.json());

app.use("/api", apiRoutes); //siempre con prefijo api
app.use("/", webRoutes); //Rutas web

// Configuración de vistas PUG - Motor de plantillas
app.set("view engine", "pug");
app.set("views", "./views");

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Hola, servidor en http://localhost:${PORT}`);
});