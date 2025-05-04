const { chromium } = require("playwright-extra");  // Usa playwright-extra
const stealth = require("puppeteer-extra-plugin-stealth");  // Plugin anti-detección
require("dotenv").config();

// Aplicar el plugin stealth
chromium.use(stealth());

const scrapeIndeed = async () => {
  const browser = await chromium.launch({
    headless: false,  // Mejor en modo visible para debug
    args: [
      "--disable-blink-features=AutomationControlled",  // Oculta automatización
      "--disable-infobars",
      "--no-sandbox"
    ],
    slowMo: 200,  // Ralentiza acciones
  });

  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    locale: "es-ES",  // Configuración regional para España
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();

  // Navegar a Indeed con comportamiento humano
  await page.goto('https://es.indeed.com/jobs?q=desarrollador+web&l=España', {
    waitUntil: "networkidle",
    timeout: 60000,
  });

  // Simular scroll humano
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
      }, 1500);  // Scroll lento
    });
  });

  // Extraer datos
  const jobs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.job_seen_beacon')).map((job) => ({
      title: job.querySelector('h2.jobTitle')?.innerText.trim() || "No encontrado",
      company: job.querySelector('.companyName')?.innerText.trim() || "No encontrado",
      location: job.querySelector('.companyLocation')?.innerText.trim() || "No encontrado",
      salary: job.querySelector('.salary-snippet')?.innerText.trim() || "No especificado",
    }));
  });

  console.log(jobs);
  await browser.close();
};

scrapeIndeed();