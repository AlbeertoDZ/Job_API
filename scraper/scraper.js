const { chromium } = require("playwright");
const { MongoClient } = require("mongodb");
require("dotenv").config();

//https://jobtoday.com/es/trabajos_f_sin-experiencia/spain

const browser = await chromium.launch(
    { headless: true }
)

const page = await browser.newPage()

await page.goto('https://jobtoday.com/es/trabajos_f_sin-experiencia/spain')