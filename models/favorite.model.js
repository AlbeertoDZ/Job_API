// models/favorite.js
const pool = require("../config/db_pgsql");
const { queries } = require("../queries/api.queries");

// Inserta favorito
// models/favorite.model.js
// async function createFavorite(userId, adId) {
//   const { rows } = await pool.query(queries.createFavorites[(userId, adId)]);
//   return rows[0];
// }

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
async function removeFavorite(id) {
  const { rowCount } = await pool.query(queries.deleteFavorite[id]);
  return rowCount;
}

const getUsersAdmin = async () => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.getUsers);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

module.exports = {
  createFavorite,
  removeFavorite,
};
