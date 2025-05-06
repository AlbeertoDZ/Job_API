const db = require("../config/db_pgsql");
const Offer = require("../models/offer.model")
const User = require("../models/users.model")
const Admin = require("../models/admin.model")

// [GET] /users - Lista de usuarios (solo admin) //MIRAR LINEA 10
const getUsersAdmin = async (req, res) => {
    try {
        const users = await Admin.getUsersAdmin();
        res.status(200).json({
            message: "Usuarios cargados correctamente",
            data: users
        });
    } catch (err){
        console.error("Error al crgar los usuarios: ", err)
        res.status(500).json({ message: "Error en el servidor" })
    }
}

//[GET] /dashboard - Vista del admin para crear y visualizar sus anuncios
const getDashboardView = async (req, res) => {
    try {
        const userId = 1 //Ponemos 1 para las pruebas, en el futuro irá: req.user?.id
        const offers = await Offer.find()

        res.status(200).json({
            message: "Vista del dashboard del administrador cargada correctamente",
            data: offers
        });
    } catch (err){
        console.error("Error al cargar el dashboard: ", err)
        res.status(500).json({ message: "Error en el servidor" })
    }

}

module.exports = {
    getUsersAdmin,
    getDashboardView
}