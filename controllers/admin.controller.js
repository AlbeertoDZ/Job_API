const db = require("../config/db_pgsql");

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

module.exports = {
    getUsersAdmin,
}