// models/favorite.js
const pool = require("../config/db_sql");

// Inserta favorito y devuelve el registro completo
async function createFavorite(userId, adId) {
  const text = `
    INSERT INTO favorites (user_id, ad_id)
    VALUES ($1, $2)
    RETURNING *
  `;
  const values = [userId, adId];
  const { rows } = await pool.query(text, values);
  return rows[0];
}

// Borra favorito por su id, devuelve rowCount
async function removeFavorite(id) {
  const text = `DELETE FROM favorites WHERE id = $1`;
  const { rowCount } = await pool.query(text, [id]);
  return rowCount;
}

module.exports = {
  createFavorite,
  removeFavorite,
};
