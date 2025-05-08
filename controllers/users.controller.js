const db = require("../config/db_pgsql");
const User= require("../models/users.model"); // Modelo de usuario
const bcrypt = require("bcrypt"); // Librería para encriptar contraseñas
const jwt = require("jsonwebtoken"); // Librería para crear tokens JWT
const pool = require('../config/db_pgsql');

//Controlador para la vista de profile
const getProfileView = async (req, res) => {
  try {
    const userId = 1; // reemplaza con req.user.id cuando implementes auth
    const result = await db.query(
      "SELECT id_user, user_name, name, surname, email, rol, user_image FROM persons WHERE id_user = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    const user = result.rows[0]
    res.render("profile", { user })
  } catch (err) {
    console.error("Error al obtener el perfil", err);
    res.status(500).json({ message: "Error en el servidor" })

  }
}

// [POST] /api/user - Registrar usuario // Revisar metodo mongo en existingUser
const createUser = async (req, res) => {
  const newUser = req.body; // {user_name, name, surname, email, user_password, rol, user_image}
  if (
    "user_name" in newUser &&
    "name" in newUser &&
    "surname" in newUser &&
    "email" in newUser &&
    "user_password" in newUser &&
    "rol" in newUser &&
    "user_image" in newUser
  )
    try {

      // Encriptar la contraseña  
      newUser.user_password = await bcrypt.hash(newUser.user_password, 10); // Hashear la contraseña
      const response = await User.createUser(newUser); // Crear el usuario en la base de datos

      res.status(201).json({
        message: `Usuario creado: ${newUser.name}`,
        items_created: response,
        data: newUser
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  else {
    res.status(400).json({ message: "Faltan campos en la entrada" });
  }
};


// [PUT] /api/user - Editar perfil
const updateUser = async (req, res) => {
  const modifiedUser = req.body; // {user_name, name, surname, email, password, rol, image}

  if (
    "user_name" in modifiedUser &&
    "name" in modifiedUser &&
    "surname" in modifiedUser &&
    "email" in modifiedUser &&
    "user_password" in modifiedUser &&
    "rol" in modifiedUser &&
    "user_image" in modifiedUser &&
    "old_email" in modifiedUser
  )
    try {
      const response = await User.updateUser(modifiedUser); // Actualizar el usuario en la base de datos
      res.status(200).json({
        items_updated: response,
        message: 'Usuario actualizado correctamente',
        data: modifiedUser
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

};




// [DELETE] /api/user - Eliminar usuario (solo admin)
const deleteUserAdmin = async (req, res) => {
  const {email} = req.params; // {email}
  
  try {
    //este if comprobar si va antes del try o dentro del try

    const response = await User.deleteUserAdmin(email); // Eliminar el usuario en la base de datos
    if (response) {
    res.status(200).json({
      message: 'Usuario eliminado correctamente',
      items_deleted: response,
      data: email
    })} else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [POST] /api/login - Iniciar sesión
const loginUsers = async (req, res) => {
  
  try {
    const dataEmail = req.body.email;
    const dataPass = req.body.password;
    const result = await db.query(`SELECT * FROM persons WHERE email = '${dataEmail}'`);
    if (result.rows.length === 0) { //rows devuelve un array, si no hay resultados, la longitud es 0
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    const person = result.rows[0];//guardamos el primer resultado del array
    console.log(person);
    
    const truePass = await bcrypt.compare(dataPass, person.user_password);
   

    if (!truePass) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign(
      { id: person.id_user, email: person.email }, // este es el "contenido" del token
      process.env.JWT_SECRET,                // aquí va tu clave secreta
      { expiresIn: '1h' }                    // duración del token
    );
    res.status(200).json({
      message: '¡Bienvenido!',
      token: token, //valor de la variable token
      user: {
        id: person.id_user,
        email: person.email
      }
    });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ msj: `ERROR: ${error.stack}` });
  }
};

//Renderizar las vistas para recuperar y reestablecer contraseña
const getRecoverPasswordView = (req, res) => {
  res.render("recoverPassword")
}

const getRestorePasswordView = (req, res) => {
  res.render("restorePassword")
}

// Recuperar constraseña
const recoverPassword = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "El email es requerido" });
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(200)
        .send("Si el email existe, te enviaremos un enlace.");
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
    console.log("Reset link:", link);
    return res
      .status(200)
      .json(
        "Las instrucciones para recuperar tu contraseña fueron enviadas a tu email."
      );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno" });
  }
};

// Cambiar contraseña
const changePassword = async (req, res) => {
  const { token, newPassword } = req.query;
  if (!token || !newPassword) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  if (newPassword.length < 8) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 8 caracteres" });
  }
  try {
    // 1) Verificamos el JWT
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    // 2) Comprobamos que existe el usuario
    const { rows } = await pool.query(queries.recoverPassword, [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // 3) Hasheamos y actualizamos
    const hashed = await bcrypt.hash(newPassword, 10);
    const result = await pool.query(queries.changePassword, [hashed, email]);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado al actualizar" });
    }
    return res
      .status(200)
      .json({ message: "Contraseña actualizada con éxito" });
  } catch (err) {
    console.error("Error en changePassword:", err);
    return res.status(500).json({ message: "Error al cambiar la contraseña" });
  }
};


module.exports = {
    getProfileView,
    createUser,
    updateUser,
    deleteUserAdmin,
    loginUsers,
    recoverPassword,
    changePassword,
    getRecoverPasswordView,
    getRestorePasswordView
};