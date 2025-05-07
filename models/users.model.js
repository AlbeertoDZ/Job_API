const pool = require('../config/db_pgsql'); // Configuracion de la BBDD
const queries = require('../queries/api.queries'); // Consultas SQL



//POST
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

// Recuperar contraseña por email
const recoverPassword = async (email) => {
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


module.exports = {
    createUser,
    updateUser,
    deleteUserAdmin,
    recoverPassword,
    updatePasswordByEmail
    
}

