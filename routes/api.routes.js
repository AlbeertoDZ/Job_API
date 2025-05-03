const express = require("express");
const router = express.Router();
const adsController = require("../controllers/apiController");
const favoritesController = require("../controllers/apiController");
const passwordController = require("../controllers/apiController");

// Eliminar anuncio (admin)
router.delete("/ads/:id", adsController.deleteAd);

// Añadir a favoritos
router.post("/favorites/:id", favoritesController.addFavorite);

// Eliminar de favoritos
router.delete("/favorites/:id", favoritesController.deleteFavorite);

// Recuperar contraseña
router.post("/recoverpassword", passwordController.sendRecoveryEmail);

// Cambiar contraseña
router.post("/restorepassword", passwordController.changePassword);

module.exports = router;
