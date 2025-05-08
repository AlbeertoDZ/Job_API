// models/favorite.js
const pool = require("../config/db_pgsql");
const queries = require("../queries/api.queries");

async function getFavorites(userId) {
  let client, result;
  try {
    client = await pool.connect();
    result = await client.query(queries.getFavoritesByUserId, [userId]);
  } catch (err) {
    console.error("Error en la query de favoritos:", err);
    throw err;
  } finally {
    if (client) client.release();
  }

  return result.rows;
}

// Crear favorito
async function createFavorite(id_user, id_favorite) {
  console.log(id_user, id_favorite);

  const client = await pool.connect();
  try {
    const data = await client.query(queries.createFavorite, [
      id_user,
      id_favorite,
    ]);
    return data.rows[0];
  } finally {
    client.release();
  }
}

// Eliminar favorito
const removeFavorite = async (id_favorite) => {
  const client = await pool.connect();
  try {
    const result = await client.query(queries.deleteFavorite, [id_favorite]);
    return result.rowCount;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  getFavorites,
  createFavorite,
  removeFavorite,
};
