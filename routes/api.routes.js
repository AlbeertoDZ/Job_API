const express = require("express");
const router = express.Router();

// Eliminar anuncio (admin)
router.delete("/ads/:id", adsController.deleteAd);

// Añadir a favoritos
router.post("/favorites/:id", favoritesController.addFavorite);

// Eliminar de favoritos
router.delete("/favorites/:id", favoritesController.removeFavorite);

// Recuperar y restaurar constraseña
router.get("/recoverpassword", authController.sendRecoveryEmail);
router.get("/restorepassword", authController.restorePassword);

module.exports = router;
