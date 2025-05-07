const pool = require("../config/db_pgsql");
const { queries } = require("../queries/api.queries");

// Recuperar contraseña por email
const getUserByEmail = async (email) => {
  const client = await pool.connect();
  try {
    const result = await client.query(queries.recoverPassword, [email]);
    return result.rows[0];
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

// Update contraseña por email
const updatePasswordByEmail = async (email, hashedPassword) => {
  const client = await pool.connect();
  try {
    const data = await client.query(queries.changePassword, [
      hashedPassword,
      email,
    ]);

    return data.rowCount;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

// async function updatePasswordByEmail(email, hashedPassword) {
//   const { rowCount } = await pool.query(
//     queries.changePassword[(hashedPassword, email)]
//   );
//   return rowCount;
// }

module.exports = {
  getUserByEmail,
  updatePasswordByEmail,
};
