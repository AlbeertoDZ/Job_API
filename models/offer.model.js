// models/offer.model.js
const mongoose = require("mongoose");
require("../config/db_mongo");

const offerSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    company: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 500 },
    city: { type: String, required: true, maxlength: 100 },
    salary: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true }
);

// lo cambiamos de "Offer" a "Ad"
module.exports = mongoose.model("Ad", offerSchema);
