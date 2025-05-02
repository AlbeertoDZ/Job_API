const express = require("express");
const router = express.Router();

// Delete ad (solo admin)
router.delete("/ads", adsController.deleteAd);

// Añadir a favoritos
router.post("/favorites", favoritesController.addFavorite);

// Eliminar de favoritos
router.delete("/favorites", favoritesController.removeFavorite);

// Recuperar y restaurar constraseña
router.get("/recoverpassword", authController.sendRecoveryEmail);
router.get("/restorepassword", authController.restorePassword);

module.exports = router;
