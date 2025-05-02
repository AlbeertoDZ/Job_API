// Eliminar anuncio (admin)
const deleteAd = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Favorite.findByIdAndDelete(id);

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
