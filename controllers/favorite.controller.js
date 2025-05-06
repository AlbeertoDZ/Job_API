const db = require("../config/db_pgsql");
const Offer = require("../models/offer.model")
const mongoose = require("mongoose")

//Controlador para la vista de favorites
const getFavoritesView = async (req, res) => {
    try {
      const userId = req.user?.id || 1; //Busca el id de un usuario logado, si no hay nadie logado utilizamos 1 para pruebas
      const result = await db.query("SELECT id_offer FROM favorites WHERE id_user = $1", [userId]); 
      const offerIds = result.rows.map(row => row.id_offer); //Extraemos solo los valores id_offer

      if (offerIds.length === 0){
        return res.status(200).json([])
      }

      const objectIds = offerIds.map(id => new mongoose.Types.ObjectId(id)); //Convertimos cada string en una instancia para que podamos hacer la búsqueda
      const favoriteOffers = await Offer.find({_id: { $in: objectIds }});

      res.status(200).json(favoriteOffers)
    } catch (err) {
      console.error("Error al obtener las ofertas guardadas", err);
      res.status(500).json({ message: "Error en el servidor"})
    }
  };

module.exports = {
    getFavoritesView,
}