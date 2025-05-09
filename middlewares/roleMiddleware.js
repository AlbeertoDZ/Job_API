function authorizeRole(rol) {
    return (req, res, next) => {
        if (req.user.role === rol) {
            return next();
        } else {
            return res.status(403).send('Acceso denegado');
        }
    };
}

module.exports = authorizeRole;
