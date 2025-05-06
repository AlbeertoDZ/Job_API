const queries = require('../db/queries/api.queries');
const pool = require('../db/config/db_pgsql'); // Configuracion de la BBDD

// Inserta favorito
async function createFavorite(userId, adId) {
    const { rows } = await pool.query(queries.createFavorites[(userId, adId)]);
    return rows[0];
  }

// Elimina favorito
async function removeFavorite(id) {
  const { rowCount } = await pool.query(queries.deleteFavorite[id]);
  return rowCount;
}




module.exports = {
    createFavorite,
};