const User = require('../models/albert.models'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcrypt');
// [GET] /users - Lista de usuarios (solo admin) //MIRAR LINEA 10
const getUsersAdmin = async (req, res) => {
    try {
        if (req.user.rol !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        const users = await User.getUsersAdmin(); 
        // Mirar parametro de base de datos (entre parentesis no quiero traer el campo password, cambiar query??)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error en la BBDD" });
    }
};

// [GET] /dashboard - Vista del administrador para crear y visualizar sus anuncios (admin)
const getDashboardAdmin = async (req, res) => {
    try {
        if (req.user.rol !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        // METER AQUÍ LA LÓGICA PARA OBTENER LOS ANUNCIOS DEL ADMINISTRADOR


        
    } catch (error) {
        res.status(500).json({ message: "Error en la BBDD" });
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
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'El email ya está registrado' });
            }

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
        "password" in modifiedUser &&
        "rol" in modifiedUser &&
        "image" in modifiedUser &&
        "old_email" in modifiedUser
    )
        try {
            // este if comprobar si va antes del try o dentro del try
            if (req.user.rol !== 'admin') {
                return res.status(403).json({ message: 'No puedes cambiar tu rol' });
            }

            // Si se actualiza la contraseña, hashearla (???)
            /*
            if (updates.password) {
                updates.password = await bcrypt.hash(updates.password, 10);
            }
            */
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
        try {
            //este if comprobar si va antes del try o dentro del try
            if (req.user.rol !== 'admin') {
                return res.status(403).json({ message: 'Acceso denegado' });
            }
            const userId = req.params.id;
            await User.findByIdAndDelete(userId); // Eliminar el usuario de la base de datos
            res.status(200).json({
                message: 'Usuario eliminado correctamente'
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};

module.exports = {
    getUsersAdmin,
    getDashboardAdmin,
    createUser,
    updateUser,
    deleteUserAdmin
};