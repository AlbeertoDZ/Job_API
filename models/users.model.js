const pool = require("../config/db_pgsql");

async function getUserByEmail(email) {
  const { rows } = await pool.query(
    `SELECT id_user, email
       FROM public.persons
      WHERE email = $1`,
    [email]
  );
  return rows[0] || null;
}

async function updatePasswordByEmail(email, hashedPassword) {
  const { rowCount } = await pool.query(
    `UPDATE public.persons
        SET user_password = $1
      WHERE email = $2`,
    [hashedPassword, email]
  );
  return rowCount;
}

module.exports = {
  getUserByEmail,
  updatePasswordByEmail,
};
