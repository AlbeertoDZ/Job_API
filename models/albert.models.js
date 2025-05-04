//const queries = require('../queries/api.queries') // Queries SQL

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

// Get Dashboard

// Create User 
const createUser = async (user) => {
    const { user_name, name, surname, email, user_password, rol, user_image } = user; // Desestructuración del objeto
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createUser , [
            user_name, 
            name, 
            surname, 
            email, 
            user_password, 
            rol, 
            user_image]);
        result = data.rowCount 
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}


//UPDATE
const updateUser = async (user) => {
    const { user_name, name, surname, email, user_password, rol, user_image, old_email } = user; // Desestructuración del objeto
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateUser, [
            user_name, 
            name, 
            surname, 
            email, 
            user_password, 
            rol, 
            user_image, 
            old_email
        ])
        result = data.rows
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}


//DELETE
const deleteUserAdmin = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteUserAdmin, [email])
        result = data.rows
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const users = {
    getUsersAdmin,
    createUser,
    updateUser,
    deleteUserAdmin
}
module.exports = users