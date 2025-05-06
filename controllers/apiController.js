const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/users.model");
const Ad = require("../models/offer.model");
const Favorite = require("../models/favorite.model");

// Eliminar anuncio (admin)
const deleteAd = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Ad.findByIdAndDelete(id);
    if (!result) return res.status(404).send("Oferta no encontrada");
    res.status(200).send("Oferta eliminada! Has borrado: " + id);
  } catch (error) {
    res.status(500).send("Error al intentar borrar la oferta");
  }
};

// Añadir a favoritos
const addFavorite = async (req, res) => {
  const adId = req.params.id;
  const { userId } = req.body;

  try {
    const favorite = await createFavorite(userId, adId);
    res.status(201).json({ message: "Favorito creado", data: favorite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear favorito" });
  }
};

// Eliminar favorito
const deleteFavorite = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCount = await removeFavorite(id);
    if (deletedCount === 0) {
      return res.status(404).send("Favorito no encontrado");
    }
    res.status(200).send("Favorito eliminado! Has borrado: " + id);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al intentar borrar el favorito");
  }
};

// Recuperar constraseña
const sendRecoveryEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "El email es requerido" });
  }

  try {
    const { rows } = await pool.query(
      `SELECT id, email FROM users WHERE email = $1`,
      [email]
    );
    if (rows.length === 0) {
      // para no filtrar si existe o no
      return res
        .status(200)
        .send("Si el email existe, te enviaremos un enlace.");
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;

    console.log("Reset link (stubbed):", link);

    res
      .status(200)
      .json(
        "Las instrucciones para recuperar tu contraseña fueron enviadas a tu email."
      );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno" });
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
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const { rows } = await pool.query(`SELECT id FROM users WHERE email = $1`, [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query(`UPDATE users SET password = $1 WHERE email = $2`, [
      hashed,
      email,
    ]);

    res.status(200).json({ message: "Contraseña actualizada con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al cambiar la contraseña" });
  }
};

module.exports = {
  deleteAd,
  addFavorite,
  deleteFavorite,
  sendRecoveryEmail,
  changePassword,
};
