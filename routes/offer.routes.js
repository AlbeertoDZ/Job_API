const express = require('express');
const router = express.Router();
const offerControllers = require("../controllers/offer.controller")

//Ruta para obtener todas las ofertas
//GET http://localhost:3000/alloffers
router.get("/alloffers", offerControllers.getAllOffers)

//GET http://localhost:3000/api/search
router.get("/search", offerControllers.searchOffers);

//POST http://localhost:3000/api/ads
router.post("/ads", offerControllers.createOffer);

//PUT http://localhost:3000/api/ads
router.put("/ads/:id", offerControllers.editOffer);

//DELETE http://localhost:3000/api/ads
router.delete("/offers/:id", offerControllers.deleteOffer);

module.exports = router;