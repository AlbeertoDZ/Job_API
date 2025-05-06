const jobOfferModel = require ('../models/offer.model')
const puppeteer = require('puppeteer');

const startBrowser = async () => {
  const browser = await puppeteer.launch({ 
    headless: true, 
    slowMo: 200
  }); 

  const page = await browser.newPage();

  await page.goto('https://ticjob.es/esp/busqueda', { //navega en esta URL
    waitUntil: 'networkidle2' //Espera hasta que no haya más de 2 peticiones de red activas
  });

  // Esperar a que se cargue al menos un job-card
  await page.waitForSelector('.job-card');

  const jobs = await page.evaluate(() => {
    const jobCards = document.querySelectorAll('.job-card');
    const results = [];

    jobCards.forEach(card => {
      const title = card.querySelector('.job-title')?.innerText.trim() || 'N/A';
      const h3 = card.querySelector('h3')?.innerText.trim() || 'N/A';
      
      // Buscar el elemento con la clase .job-description dentro de card
      const descriptionElement = card.querySelector('.job-description');
      // Obtener el texto o mostrar mensaje por defecto
      let description = descriptionElement ? descriptionElement.innerText.trim() : "No description found";
      // Limitar a 100 caracteres (no 150 como antes) y añadir "..." si es largo
      description = description.length > 100
        ? description.substring(0, 150) + "..."
        : description;
      // Elimina saltos de línea
      description = description.replace(/(\r\n|\n|\r|\t)/gm, " ");

      const location = card.querySelector('.job-card-label.location-field')?.innerText.trim() || 'N/A';
      const salary = card.querySelector('.job-card-label.salary-field')?.innerText.trim() || 'N/A';
      const url = card.querySelector('.job-card-header a').href || 'N/A';

      results.push({ title, h3, description, location, salary, url });
    });

    return results;
  }); 



  // await page.click(a[href='/'])?

  console.log('Offers found:', jobs.length);
  console.log(jobs);

  await browser.close();
};

startBrowser();