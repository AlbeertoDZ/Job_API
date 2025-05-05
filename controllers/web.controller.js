const db = require("../config/db_pgsql");

//Importamos el modelo de oferta
const Offer = require("../models/offer.model")

//Controlador para la vista de favorites
const getFavoritesView = async (req, res) => {
  try {
    const titleOffer = req.session.favorites.title;
    const result = await db.query("SELECT * FROM favorites WHERE title = $1", [titleOffer]);
    res.render("favorites", { favorites: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al cargar favoritos");
  }
};

//Controlador para la vista de profile
const getProfileView = async (req, res) => {
  try {
    const userName = req.session.user.user_name;
    const result = await db.query("SELECT * FROM persons WHERE user_name = $1", [userName]);
    res.render("profile", { user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al cargar perfil");
  }
};


//Controlador para la vista dashboard de admin

const getDashboardAdmin = async (req, res) => {
  try {
    const offers = await Offer.find();

    res.render("dashboard", {
      user: req.session.user,
      offers,
    })
  } catch (error){
    console.error("Error al cargar el dashboard: ", error)
    res.status(500).send("Error interno del servidor")
  }
} 

module.exports = {
  getFavoritesView,
  getProfileView,
  getDashboardAdmin
};
