const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

//POST http://localhost:3000/api/login
router.post("/login", apiController.login);


//POST http://localhost:3000/api/logout
router.post("/logout", (req, res) => {
    res.redirect('/login');
  });
//No necesita token, ni lógica complicada

//GET http://localhost:3000/api/search
router.get("/search", apiController.search);

//POST http://localhost:3000/api/ads
router.post("/ads", apiController.ads); //crear una nueva oferta de empleo

//PUT http://localhost:3000/api/ads
router.put("/ads/:id", apiController.editAds); //editar una nueva oferta de empleo

module.exports = router;

