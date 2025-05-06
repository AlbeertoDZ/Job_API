const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    adId: { type: mongoose.Types.ObjectId, ref: "Ad", required: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
