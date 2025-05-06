const db = require("../config/db_pgsql");
const Offer = require("../models/offer.model")
const User = require("../models/users.model")

// [GET] /users - Lista de usuarios (solo admin) //MIRAR LINEA 10
const getUsersAdmin = async (req, res) => {
    try {
        const userRol = "admin"
        if (userRol !== "admin"){
            return res.status(403).json({ message: "Acceso denegado"})
        }
        /* if (req.user.rol !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado' });
        } */
        const users = await User.getUsersAdmin(); 
        // Mirar parametro de base de datos (entre parentesis no quiero traer el campo password, cambiar query??)
        res.status(200).json(users);
    } catch (error) {
        console.error("Error al obtener los usuarios: ", error)
        res.status(500).json({ message: "Error en la BBDD" });
    }
};

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