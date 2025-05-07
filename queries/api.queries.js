const queries = {
  createFavorite: `INSERT INTO favorites (id_user, id_offer)
     VALUES ($1, $2)
     RETURNING *`,
  deleteFavorite: `
     DELETE FROM favorites
     WHERE id_favorite = $1
     `,
  recoverPassword: `SELECT id_user, email
     FROM public.persons
    WHERE email = $1`,
  changePassword: `UPDATE public.persons
      SET user_password = $1
    WHERE email = $2`,
};

const { model, models } = require("mongoose");

module.exports = {
  queries,
};
