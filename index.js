require("dotenv").config();
require("./config/db_mongo");
const express = require("express");
const app = express();
const apiRoutes = require("./routes/api.routes");
const webRoutes = require("./routes/web.routes");

// Para poder leer JSON en las peticiones
app.use(express.json());

app.use("/api", apiRoutes); //siempre con prefijo api
app.use("/", webRoutes);

// Conexión a Mongo
require("./config/db_mongo");

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Hola, servidor en http://localhost:${PORT}`);
});
