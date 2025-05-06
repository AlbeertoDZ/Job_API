const pool = require("../config/db_pgsql");
const { queries } = require("../queries/api.queries");

async function getUserByEmail(email) {
  const { rows } = await pool.query(queries.recoverPassword[email]);
  return rows[0] || null;
}

async function updatePasswordByEmail(email, hashedPassword) {
  const { rowCount } = await pool.query(
    queries.changePassword[(hashedPassword, email)]
  );
  return rowCount;
}

module.exports = {
  getUserByEmail,
  updatePasswordByEmail,
};
