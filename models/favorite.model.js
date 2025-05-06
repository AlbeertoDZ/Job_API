// models/favorite.js
const pool = require("../config/db_pgsql");

// Inserta favorito
// models/favorite.model.js
async function createFavorite(userId, adId) {
  const { rows } = await pool.query(
    `INSERT INTO favorites (id_user, id_offer)
     VALUES ($1, $2)
     RETURNING *`,
    [userId, adId]
  );
  return rows[0];
}

// Eliminar favorito
async function removeFavorite(id) {
  const text = `DELETE FROM favorites WHERE id = $1`;
  const values = [id];
  const result = await pool.query(text, values);
  return result.rowCount;
}

module.exports = {
  createFavorite,
  removeFavorite,
};
