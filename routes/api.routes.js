const express = require('express');
const router = express.Router();
const apiController = require("../controllers/albert.controller")

//GET --> Vista de admin con el listado de usuarios registrados (admin)
router.get('/users', apiController.getUsersAdmin);

//CAMBIAR /api, ya que en el index ya esta implementado en las rutas

//POST --> Registrarse en la app
router.post('/api/user', apiController.createUser);

//PUT --> Editar datos del perfil del usuario o admin
router.put('/api/user', apiController.updateUser)

//DELETE --> Borrar usuario de la BBDD (admin)
router.delete('/api/user', apiController.deleteUserAdmin)

module.exports = router;

