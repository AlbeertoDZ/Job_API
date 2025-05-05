const db = require("../config/db_pgsql");

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

module.exports = {
    getFavoritesView,
}