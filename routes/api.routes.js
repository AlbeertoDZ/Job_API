const express = require("express");
const router = express.Router();

// Eliminar anuncio (admin)
router.delete("/ads/:id", adsController.deleteAd);

// Añadir a favoritos
router.post("/favorites/:id", favoritesController.addFavorite);

// Eliminar de favoritos
router.delete("/favorites/:id", favoritesController.removeFavorite);

// Recuperar contraseña
router.post("/recoverpassword", authController.sendRecoveryEmail);

// Cambiar contraseña
router.post("/restorepassword", authController.restorePassword);

module.exports = router;
