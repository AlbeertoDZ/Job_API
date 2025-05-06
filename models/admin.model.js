const queries = require('../queries/api.queries')
const pool = require('../config/db_pgsql'); // Configuracion de la BBDD
// GET Users
const getUsersAdmin = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getUsers)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

module.exports = {
    getUsersAdmin
}