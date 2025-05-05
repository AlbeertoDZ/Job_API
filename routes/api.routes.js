// routes/api.routes.js
const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// Eliminar anuncio (admin)
router.delete("/ads/:id", apiController.deleteAd);

// Añadir a favoritos
router.post("/favorites/:id", apiController.addFavorite);

// Eliminar de favoritos
router.delete("/favorites/:id", apiController.deleteFavorite);

// Recuperar contraseña
router.get("/recoverpassword", apiController.sendRecoveryEmail);

// Cambiar contraseña
router.get("/restorepassword", apiController.changePassword);

module.exports = router;
