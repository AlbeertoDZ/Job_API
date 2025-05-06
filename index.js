require('dotenv').config();// Cargar variables de entorno

const express = require('express');
const app = express();

const apiRoutes = require('./routes/api.routes');
const webRoutes = require('./routes/web.routes');

require('./config/db_mongo'); 

// Para poder leer JSON en las peticiones
app.use(express.json());


app.use('/api', apiRoutes); //siempre con prefijo api
app.use('/', webRoutes);









// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Hola, servidor en http://localhost:${PORT}`);
});