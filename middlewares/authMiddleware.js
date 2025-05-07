const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Importar la clave secreta del archivo .env

function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    try {
        // Verificar el token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Guardar los datos decodificados del token en req.user
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
}



module.exports = authMiddleware;
