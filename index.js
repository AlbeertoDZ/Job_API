const express = require("express");
const app = express();

// Importar Swagger UI
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("dotenv").config(); // Cargar variables de entorno

const connectDB = require("./config/db_mongo"); // Conexión a MongoDB Atlas
//Conectar a la base de datos de MongoDB Atlas
connectDB().then(() => {
  console.log("Index: MongoDB Atlas conectado correctamente");
  ejecutarScraping();
});

//const mongoose = require("mongoose");
const scrapeOffers = require("./utils/scraper");
const saveOffersToDB = require("./utils/saveOffers");

//const apiRoutes = require("./routes/api.routes");
const userRoutes = require("./routes/users.routes");
const adminRoutes = require("./routes/admin.routes");
const offerRoutes = require("./routes/offer.routes");
const favoriteRoutes = require("./routes/favorite.routes");

//Middleware Morgan
const morgan = require("./middlewares/morgan");

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Logger
app.use(express.static("public")); // Middleware para servir archivos estáticos de front

// Para poder leer JSON en las peticiones
app.use(express.json());

app.use("/", userRoutes);
//app.use("/api", apiRoutes); //siempre con prefijo api
app.use("/offers", offerRoutes); //Rutas ofertas de trabajo
app.use("/users", userRoutes); //Rutas de usuarios
app.use("/admin", adminRoutes); //Rutas de admin
app.use("/favorites", favoriteRoutes); //Ruta de ofertas favoritas

// Configuración de vistas PUG - Motor de plantillas
app.set("view engine", "pug");
app.set("views", "./views");

//ejecutar scraping
const Offer = require("./models/offer.model");

// Ejecutar scraping solo si no hay ofertas en la base de datos
async function ejecutarScraping() {
  try {
    const count = await Offer.countDocuments();
    if (count === 0) {
      console.log("Ejecutando scraping...");
      const jobOffers = await scrapeOffers();
      console.log("Intentando insertar", jobOffers.length, "ofertas");
      await saveOffersToDB(jobOffers);
    } else {
      console.log(
        `Ya hay ${count} ofertas en MongoDB. No se ejecuta scraping.`
      );
    }
  } catch (error) {
    console.error("Error durante el scraping:", error.message);
  }
}

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Hola, servidor en http://localhost:${PORT}`);
});
