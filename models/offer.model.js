const mongoose = require("mongoose");
require("../config/db_mongo")

const objectSchema = {
      title: {
        type: String,
        required: true,
        maxlength: 100,
      },
      company: {
        type: String,
        required: true,
        maxlength: 100,
      },
      description: {
        type: String,
        required: true,
        maxlength: 500,
      },
      city: {
        type: String,
        required: true,
        maxlength: 100,
      },
      salary: {
        type: Number,
        required: true,
      }
}

//Creamos el schema
const offerSchema = mongoose.Schema(objectSchema, {versionKey: false})

//Creamos el modelo --> Colección
const Offer = mongoose.model("Offer", offerSchema)

module.exports = Offer;

