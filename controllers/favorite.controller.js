const mongoose = require("mongoose");
const Offer = require("../models/offer.model");
const Favorites = require("../models/favorite.model");

const getFavoritesView = async (req, res) => {
  try {
    const userId = req.user?.id || 1;

    const registros = await Favorites.getFavorites(userId);

    if (!registros.length) {
      return res.render("favorites", { offers: [] });
    }

    const ofertasValidas = [];
    for (const { id_offer } of registros) {
      try {
        const oferta = await Offer.findById(id_offer);

        if (oferta) ofertasValidas.push(oferta);
      } catch (err) {
        console.error(`Error al buscar oferta con ID ${id_offer}:`, err.message);
      }
    }

    // 3. Renderizar la vista con las ofertas encontradas
    res.render("favorites", { offers: ofertasValidas });
  } catch (err) {
    console.error("Error al obtener las ofertas favoritas:", err);
    res.status(500).send("Error en el servidor");
  }
};


// Añadir a favoritos
const addFavorite = async (req, res) => {
  const adId = req.params.id;
  const userId = req.body.userId;
  try {
    const favorite = await createFavorite(userId, adId);
    res.status(201).json({ message: "Favorito creado", data: favorite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear favorito" });
  }
};

// Eliminar favorito
const deleteFavorite = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCount = await removeFavorite(id);
    if (deletedCount === 0) {
      return res.status(404).send("Favorito no encontrado");
    }
    res.status(200).send("Favorito eliminado! Has borrado: " + id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al intentar borrar el favorito" });
  }
};

module.exports = {
    getFavoritesView,
    addFavorite,
    deleteFavorite,
}