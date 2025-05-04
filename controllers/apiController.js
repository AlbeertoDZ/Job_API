const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users.model");

// Eliminar anuncio (admin)
const deleteAd = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Ad.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send("Anuncio no encontrado");
    }

    res.status(200).send("Anuncio eliminado! Has borrado: " + id);
  } catch (error) {
    res.status(500).send("Error al intentar borrar el anuncio");
  }
};

// Añadir a favoritos
const addFavorite = async (req, res) => {
  try {
    const adId = req.params.id;
    const userId = req.body.userId;
    let answer = await new Favorite({ userId, adId }).save();
    res.status(201).json({ message: "Favorito creado", data: answer });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ msj: `ERROR: ${error.stack}` });
  }
};

// Eliminar favorito
const deleteFavorite = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Favorite.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send("Anuncio no encontrado");
    }

    res.status(200).send("Favorito eliminado! Has borrado: " + id);
  } catch (error) {
    res.status(500).send("Error al intentar borrar el favorito");
  }
};

// Recuperar constraseña
// const restorePassword = async (req, res) => {
//   try {
//     const email = req.query.email;
//     if (email) {
//       let answer = await create Password(userId).save();
//     }
//     if (!result) {
//       return res.status(404).send("Anuncio no encontrado");
//     }

//     res.status(200).send("Favorito eliminado! Has borrado: " + id);
//   } catch (error) {
//     res.status(500).send("Error al intentar borrar el favorito");
//   }
// };
const sendRecoveryEmail = async (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.status(400);
    throw new Error("El email es requerido");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .send("Si el email existe, te enviaremos un enlace.");
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await mail.send(passwordResetTemplate(user.toObject(), link));
    res
      .status(200)
      .json(
        "Las intstrucciones para recuperar tu contraseña fueron enviadas a tu email."
      );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Cambiar contraseña
const changePassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  if (newPassword.length < 8) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 8 caracteres" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error.message);
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
