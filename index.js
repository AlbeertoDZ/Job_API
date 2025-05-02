const express = require('express');
const app = express();
const routes = require('./routes');

// Para poder leer JSON en las peticiones
app.use(express.json());

// Conectar el router
app.use('/', routes);





// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Hola, servidor en http://localhost:${PORT}`);
});