const Offer = require('../models/offer.model');

async function saveOffersToDB(offers) {
  try {
    console.log("Intentando insertar", offers.length, "ofertas");

    const result = await Offer.insertMany(offers, {
      ordered: false,
      rawResult: true
    });

    console.log(`Ofertas insertadas: ${result.insertedCount}`);
  } catch (error) {
    console.error("Error al guardar las ofertas en MongoDB:");
    
    if (error.writeErrors) {
      error.writeErrors.forEach((err, index) => {
        console.error(`Error en el documento ${index + 1}:`);
        console.error("Mensaje:", err.errmsg || err.message);
        console.error("Documento:", err.op);
      });
    } else {
      console.error(error);
    }
  }
}

module.exports = saveOffersToDB;