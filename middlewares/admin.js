function isAdminMiddleware(req, res, next) {
    // Verifica si el usuario está autenticado y tiene el rol de administrador
    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }
  
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Acceso denegado: se requiere rol de administrador" });
    }
  
    next(); // Si el rol es admin, continúa con la siguiente función middleware o ruta
  }
  
  module.exports = isAdminMiddleware;