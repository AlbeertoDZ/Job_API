
const queries = {
    getUsers: `SELECT * 
    FROM persons`,
    createUser: `INSERT INTO persons (user_name, name, surname, email, user_password, rol, user_image)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    updateUser: `UPDATE persons SET user_name = $1, name = $2, surname = $3, email = $4, user_password = $5, rol = $6, user_image = $7 
    WHERE email = $8`,
    deleteUser: `DELETE FROM persons WHERE email = $1`,
}
module.exports = queries;