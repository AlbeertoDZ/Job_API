// models/favorite.model.js
module.exports = {
  // Para addFavorite
  create: async ({ userId, adId }) => {
    return { _id: "fakeFavId", userId, adId, createdAt: new Date() };
  },
  // Para deleteFavorite
  findByIdAndDelete: async (id) => {
    return { _id: id };
  },
};
