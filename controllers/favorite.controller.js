const mongoose = require("mongoose");
const Offer = require("../models/offer.model");
const Favorites = require("../models/favorite.model");

const getFavoritesView = async (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const offerIds = await Favorites.getFavorites(userId);

    if (offerIds.length === 0) {
      return res.render("favorites", { offers: [] });
    }

    const objectIds = offerIds.map(obj => new mongoose.Types.ObjectId(obj.id_offer));
    const favoriteOffers = await Offer.find({ _id: { $in: objectIds } });

    res.render("favorites", { offers: favoriteOffers });
  } catch (err) {
    console.error("Error al obtener las ofertas guardadas:", err);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = {
    getFavoritesView,
}