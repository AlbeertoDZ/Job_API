const queries = require('../db/queries/api.queries');
const pool = require('../db/config/db_pgsql'); // Configuracion de la BBDD

// Crear favorito
async function createFavorite(userId, adId) {
  const client = await pool.connect();
  try {
    const data = await client.query(queries.createFavorite, [userId, adId]);
    return data.rows[0];
  } finally {
    client.release();
  }
}   
// Eliminar favorito
const removeFavorite = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query(queries.deleteFavorite, [id]);
    return result.rowCount;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};




module.exports = {
    createFavorite,
    removeFavorite
};