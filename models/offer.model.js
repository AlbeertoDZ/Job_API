const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    id_offer: { type: String, required: true, unique: true },
    company: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 500 },
    city: { type: String, required: true, maxlength: 100 },
    salary: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "offers", // ← aquí obligamos al nombre exacto
  }
);

module.exports = mongoose.model("Ad", offerSchema);
