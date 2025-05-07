const express = require('express');
const router = express.Router();
const usersControllers = require("../controllers/users.controller")
const authMiddleware = require("../middlewares/authMiddleware")

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

//GET http://localhost:3000/profile
router.get("/profile", usersControllers.getProfileView)
//router.get("/profile", authMiddleware, usersControllers.getProfileView)

//API REST

//POST --> Registrarse en la app
router.post('/api/user', usersControllers.createUser);

//PUT --> Editar datos del perfil del usuario o admin
router.put('/api/user', usersControllers.updateUser);

//DELETE --> Borrar usuario de la BBDD (admin)
router.delete('/api/user', usersControllers.deleteUserAdmin)

//POST http://localhost:3000/api/login
router.post("/login", usersControllers.loginUsers);

//PASSWORD RECOVERY

//GET Recuperar contraseña
router.get("/recoverpassword", usersControllers.recoveryPassword);

//GET Cambiar contraseña
router.get("/changepassword", usersControllers.changePassword);

//POST http://localhost:3000/api/logout
router.post("/logout", (req, res) => {
    res.redirect('/login');
  });

module.exports = router;

