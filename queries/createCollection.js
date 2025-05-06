const mongoose = require("mongoose");
const Offer = require("./models/offer.model");
require("./config/db_mongo");

const offers = [
  {
    title: "Desarrollador Frontend React",
    company: "TechCorp",
    description: "Responsable del desarrollo de interfaces modernas usando React.",
    city: "Madrid",
    salary: 35000
  },
  {
    title: "Backend Developer Node.js",
    company: "Backendify",
    description: "Desarrollar servicios y APIs RESTful con Node.js y Express.",
    city: "Barcelona",
    salary: 40000
  },
  {
    title: "Fullstack Developer MERN",
    company: "Innovatech",
    description: "Responsable de proyectos fullstack usando MongoDB, Express, React y Node.",
    city: "Valencia",
    salary: 42000
  }
];

async function seedDB() {
  try {
    await Offer.insertMany(offers);
    console.log("Ofertas insertadas con éxito");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error insertando ofertas:", error);
  }
}

seedDB();