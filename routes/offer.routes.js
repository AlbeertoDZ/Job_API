const express = require("express");
const router = express.Router();
const offerControllers = require("../controllers/offer.controller");

//GET http://localhost:3000/api/search
router.get("/search", offerControllers.searchOffers);

//POST http://localhost:3000/api/ads
router.post("/ads", offerControllers.createOffer);

//PUT http://localhost:3000/api/ads
router.put("/ads/:id", offerControllers.editOffer);

//DELETE http://localhost:3000/api/ads
router.delete("/:id", offerControllers.deleteOffer);

module.exports = router;
