const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// Eliminar anuncio (admin)
router.delete("/offers/:id", apiController.deleteAd);

// Añadir a favoritos
router.post("/favorites/:id", apiController.addFavorite);

// Eliminar de favoritos
router.delete("/favorites/:id", apiController.deleteFavorite);

// Recuperar contraseña
router.get("/recoverpassword", apiController.sendRecoveryEmail);

// Cambiar contraseña
router.post("/restorepassword", apiController.changePassword);

module.exports = router;
