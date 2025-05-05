const express = require('express');
const router = express.Router();

const webControllers = require("../controllers/web.controller")
const authorizeRole = require("../middlewares/roleMiddleware")
const checkAuth = require("../middlewares/authMiddleware")


//GET Rutas públicas --> http://localhost:3000/

router.get("/", (req, res) => {
    res.render("home");
})

//GET http://localhost:3000/login
router.get("/login", (req, res) => {
    res.render("login");
})

//GET http://localhost:3000/signup
router.get("/signup", (req, res) => {
    res.render("signup");
})


//GET Rutas para usuario logueado
//http://localhost:3000/favorites
router.get("/favorites", checkAuth, webControllers.getFavoritesView)

//http://localhost:3000/profile
router.get("/profile", checkAuth, webControllers.getProfileView)


//GET Ruta solo para admin 
// http://localhost:3000/admin/dashboard
router.get("/admin/dashboard", checkAuth, authorizeRole("admin"), webControllers.getDashboardAdmin)


module.exports = router;