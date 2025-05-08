const db = require("../config/db_pgsql");
const Offer = require("../models/offer.model")
const User = require("../models/users.model")
const Admin = require("../models/admin.model")

// [GET] /users - Lista de usuarios (solo admin) //MIRAR LINEA 10
const getUsersAdmin = async (req, res) => {
    try {
      const users = await Admin.getUsersAdmin();
      res.render("dashboardAdmin", { users });

    } catch (err) {

      console.error("Error al cargar los usuarios:", err);
      res.status(500).send("Error en el servidor");

    }
};

//[GET] /dashboard - Vista del admin para crear y visualizar sus anuncios
const getDashboardView = async (req, res) => {
    try {
        //const userId = 1; //Para pruebas. Con auth será ==> req.user.id
        const offers = await Offer.find();

        //console.log("Ofertas cargadas desde MongoDB: ", offers)

        res.render("dashboardOffers", { offers })
    } catch (err) {
        console.error("Error al cargar el dashboard: ", err);
        res.status(500).send("Error en el servidor")
    }
}

module.exports = {
    getUsersAdmin,
    getDashboardView
}