const db = require("../config/db_mongo");
const Offer = require('../models/offer.model'); // Modelo de oferta
const bcrypt = require("bcrypt"); // Librería para encriptar contraseñas
const jwt = require("jsonwebtoken"); // Librería para crear tokens JWT

// [GET] /api/search - Buscar ofertas de trabajo
const searchOffers = async (req, res) => {
    const job = req.query.job;
    const city = req.query.city;
    const salary = req.query.salary;
    if (!job || !city || !salary) {
      return res.status(400).json({
        message: 'Debes enviar los tres parámetros: job, city y salary',
      });
    }
    try {
      const resultados = await Offer.find({
        description: { $regex: job, $options: 'i' }, //regex para encontrar coincidencias en el texto
        city: { $regex: city, $options: 'i' }, //i para no distinguir entre may y min
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

//POST http://localhost:3000/api/ads/(..id..)
const createOffer = async (req, res) => {
  const title = req.body.title;
  const company = req.body.company;
  const description = req.body.description;
  const city = req.body.city;
  const salary = req.body.salary;
  const url = req.body.url;
  // Validar que todos los campos estén presentes
  if (!title || !company || !description || !city || !salary || !url) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  try {
    const nuevaOferta = await Offer.create({
      title,
      company,
      description,
      city,
      salary,
      url
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
const editOffer = async (req, res) => {
  const id = req.params.id;
  const company = req.body.company;
  const title = req.body.title;
  const description = req.body.description;
  const city = req.body.city;
  const salary = req.body.salary;
  const url = req.body.url;
  // Validar campos
  if (!company || !title || !description || !city || !salary || !url) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  try {
    // Buscar y actualizar la oferta por su _id de MongoDB
    const ofertaActualizada = await Offer.findByIdAndUpdate(
      id,
      { company, title, description, city, salary, url },
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
    console.error('ERROR:', error.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

//DELETE http://localhost:3000/api/ads
const deleteOffer = async (req, res) => {
  const id = req.params.id;
  console.log("borro oferta con id:", id);
  try {
    const deleted = await Offer.findByIdAndDelete(id);
    console.log("resultado delete:", deleted);
    if (!deleted) return res.status(404).send("Oferta no encontrada");
    res.status(200).send("Oferta eliminada: " + id);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al intentar borrar la oferta");
  }
};

  module.exports = {
    searchOffers,
    createOffer,
    editOffer,
    deleteOffer
  };