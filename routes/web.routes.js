const express = require('express');
const router = express.Router();

//Vistas inicio web

//GET http://localhost:3000/
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


//Vistas de usuario o admin registrado

//GET http://localhost:3000/favorites
router.get("/favorites", (req, res) => {
    res.render("favorites");
})

//GET http://localhost:3000/profile
router.get("/profile", (req, res) => {
    res.render("profile");
})

module.exports = router;