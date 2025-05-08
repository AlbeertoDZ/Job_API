const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdminMiddleware = require("../middlewares/admin");

//Vistas inicio web

//GET http://localhost:3000/
router.get("/", (req, res) => {
  res.render("home");
});

//GET http://localhost:3000/login
router.get("/login", (req, res) => {
  res.render("login");
});

//GET http://localhost:3000/signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

//GET http://localhost:3000/profile
router.get("/profile", usersControllers.getProfileView);
//router.get("/profile", authMiddleware, usersControllers.getProfileView)

//API REST

//POST --> Registrarse en la app
router.post("/", usersControllers.createUser);

//PUT --> Editar datos del perfil del usuario o admin
// Quite /api/user porque no lo estaba reconociendo
router.put("/", usersControllers.updateUser);

//DELETE --> Borrar usuario de la BBDD (admin)

router.delete(
  "/:email",
  authMiddleware,
  isAdminMiddleware,
  usersControllers.deleteUserAdmin
);
//authMiddleware, isAdminMiddleware

//POST http://localhost:3000/api/login
router.post("/login", usersControllers.loginUsers);

//GET Recuperar contraseña http://localhost:3000/recoverpassword
router.get("/recoverpassword", usersControllers.recoverPassword);

//GET Cambiar contraseña
router.get("/restorepassword", usersControllers.changePassword);

//POST http://localhost:3000/api/logout
router.post("/logout", (req, res) => {
  res.redirect("/login");
});

module.exports = router;
