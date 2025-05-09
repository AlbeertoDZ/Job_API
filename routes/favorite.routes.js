const express = require("express");
const router = express.Router();
const favoritesControllers = require("../controllers/favorite.controller");

//GET http://localhost:3000/favorites
router.get("/", favoritesControllers.getFavoritesView);
//router.get("/", authMiddleware, favoritesControllers.getFavoritesView)

//POST http://localhost:3000/api/favorites
router.post("/:id", favoritesControllers.addFavorite);

//DELETE http://localhost:3000/api/favorites
router.delete("/:id", favoritesControllers.deleteFavorite);

module.exports = router;
