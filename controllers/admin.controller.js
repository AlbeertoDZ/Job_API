const db = require("../config/db_pgsql");

const getUsersAdmin = async (req, res) => {
    try {
        if (req.user.rol !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        const users = await User.getUsersAdmin();
        // Meter middleware para que solo el admin pueda acceder a esta ruta
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error en la BBDD" });
    }
};

module.exports = {
    getUsersAdmin,
}