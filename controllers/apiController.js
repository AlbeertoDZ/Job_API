const pool = require('../config/db_pgsql'); // conexión a la BBDD
// const queries = require("./queries"); // Queries SQL
const bcrypt = require('bcrypt'); // Librería para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Librería para crear tokens
const Offer = require('../models/offer.model');

//POST http://localhost:3000/api/login
const login = async (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);
  
    try {
      const dataEmail = req.body.email;
      const dataPass = req.body.password;
      const result = await pool.query(`SELECT * FROM persons WHERE email = '${dataEmail}'`);

      if (result.rows.length === 0) { //rows devuelve un array, si no hay resultados, la longitud es 0
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      const person = result.rows[0];//guardamos el primer resultado del array

      const truePass = await bcrypt.compare(dataPass, person.password);

      if (!truePass) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign(
        { id: person.id_user, email: person.email }, // este es el "contenido" del token
        process.env.JWT_SECRET,                // aquí va tu clave secreta
        { expiresIn: '1h' }                    // duración del token
      );

      res.status(200).json({ 
        message: '¡Bienvenido!',
        token: token, //valor de la variable token
        user: {
          id: person.id_user,
          email: person.email
        }
      });


    } catch (error) {
      console.log(`ERROR: ${error.stack}`);
      res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
  };

//GET http://localhost:3000/api/search
const search = async (req, res) => {
  const job = req.query.job;
  const city = req.query.city;
  const salary = req.query.salary;

  if (!job || !city || !salary) {
    return res.status(400).json({
      message: 'Debes enviar los tres parámetros: job, city y salary',
    });
  }

  console.log("Parámetros recibidos:");
  console.log("job:", job);
  console.log("city:", city);
  console.log("salary:", salary);

  try {
    const resultados = await Offer.find({
      description: { $regex: job, $options: 'x' }, //regex para encontrar coincidencias en el texto
      city: { $regex: city, $options: 'x' }, //options para no distinguir entre may y min
      salary: { $gte: Number(salary) } //gte busca cifra igual o mayor
    });

    console.log("No se encontraron resultados");

    if (resultados.length === 0) {
      return res.status(404).json({ message: 'No se encontraron resultados' });
    }

    res.status(200).json(resultados);

  } catch (error) {
    console.error('ERROR:', error.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

//POST http://localhost:3000/api/ads
const ads = async (req, res) => {
  
  const title = req.body.title;
  const company = req.body.company;
  const description = req.body.description;
  const city = req.body.city;
  const salary = req.body.salary;

  // Validar que todos los campos estén presentes
  if (!title || !company || !description || !city || !salary) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevaOferta = await Offer.create({
      title,
      company,
      description,
      city,
      salary
    });

    res.status(201).json({
      message: 'Oferta de empleo creada correctamente',
      offer: nuevaOferta,
    });

  } catch (error) {
    console.error(`ERROR: ${error.stack}`);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

//PUT http://localhost:3000/api/ads
const editAds = async (req, res) => {
  const id = req.params.id;

  const company = req.body.company;
  const title = req.body.title;
  const description = req.body.description;
  const city = req.body.city;
  const salary = req.body.salary; 

  // Validar campos
  if (!company || !title || !description || !city || !salary) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Buscar y actualizar la oferta por su _id de MongoDB
    const ofertaActualizada = await Offer.findByIdAndUpdate(
      id,
      { company, title, description, city, salary },
      { new: true } // new: true devuelve el doc actualizado
    );                                   

  
    if (!ofertaActualizada) {
      return res.status(404).json({ message: 'Oferta no encontrada' });
    }

    res.status(200).json({
      message: 'Oferta actualizada correctamente',
      offer: ofertaActualizada
    });

  } catch (error) {
    console.error('ERROR PUT /api/ads/:id:', error.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};        



module.exports = {
  login,
  search,
  ads,
  editAds
};