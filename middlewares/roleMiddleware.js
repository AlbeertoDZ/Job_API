function authorizeRole(role) {
    return (req, res, next) => {
        const user = req.session.user
        if (user && user.role === role) {
            return next();
        } else {
            return res.status(403).send("Acceso denegado");
        }
    };
}

module.exports = authorizeRole;