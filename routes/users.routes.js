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

//POST --> Registrarse en la app http://localhost:3000/api/user
router.post('/api/user', usersControllers.createUser);

//PUT --> Editar datos del perfil del usuario o admin http://localhost:3000/api/user
router.put('/api/user', usersControllers.updateUser);

//DELETE --> Borrar usuario de la BBDD (admin) http://localhost:3000/api/user
router.delete('/api/user', usersControllers.deleteUserAdmin)

//POST http://localhost:3000/api/login
router.post("/api/login", usersControllers.loginUsers);

//GET Recuperar contraseña http://localhost:3000/recoverpassword
router.get("/recoverpassword", usersControllers.recoverPassword);

//GET Cambiar contraseña http://localhost:3000/reset-password
router.get("/reset-password", usersControllers.changePassword);


//POST http://localhost:3000/api/logout
router.post("/api/logout", (req, res) => {
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
  });


module.exports = router;

