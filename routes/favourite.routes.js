const express = require('express');
const router = express.Router();
const favoritesControllers = require("../controllers/favorites.controller")


//GET http://localhost:3000/favorites
router.get("/favorites", authMiddleware, favoritesControllers.getFavoritesView)

//POST http://localhost:3000/api/favorites


//DELETE http://localhost:3000/api/favorites


module.exports = router;