const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
require('dotenv').config();

// Aplicar el plugin stealth
puppeteer.use(StealthPlugin());

const scrapeIndeed = async () => {
  const browser = await puppeteer.launch({
    headless: false, // Modo visible para debugging
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ],
    slowMo: 100, // Ralentizar acciones
  });

  const page = await browser.newPage();

  // Configurar User-Agent y viewport
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  await page.setViewport({ width: 1280, height: 720 });

  // Navegar a Indeed
  await page.goto('https://es.indeed.com/jobs?q=desarrollador+web&l=España', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  // Simular comportamiento humano
  await scrollPage(page);
  await page.waitForTimeout(2000 + Math.random() * 3000);

  // Extraer datos
  const jobs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.job_seen_beacon')).map(job => ({
      title: job.querySelector('h2.jobTitle')?.innerText.trim() || "No encontrado",
      company: job.querySelector('.companyName')?.innerText.trim() || "No encontrado",
      location: job.querySelector('.companyLocation')?.innerText.trim() || "No encontrado",
      salary: job.querySelector('.salary-snippet')?.innerText.trim() || "No especificado",
      description: job.querySelector('.job-snippet')?.innerText.trim() || "No disponible"
    }));
  });

  console.log('Trabajos encontrados:', jobs.length);
  console.log(jobs);

  await browser.close();
};

// Función para simular scroll humano
async function scrollPage(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 200;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight / 2) {
          clearInterval(timer);
          resolve();
        }
      }, 1500);
    });
  });
}

scrapeIndeed().catch(console.error);