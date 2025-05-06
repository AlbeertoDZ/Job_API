// models/favorite.js
const pool = require("../config/db_pgsql");
const { queries } = require("../queries/api.queries");

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

// Crear favorito
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
