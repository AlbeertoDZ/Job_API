const puppeteer = require('puppeteer');

const startBrowser = async () => {
  const browser = await puppeteer.launch({ 
    headless: true, 
    slowMo: 200
  }); 

  const page = await browser.newPage();

  await page.goto('https://ticjob.es/esp/busqueda', {
    waitUntil: 'networkidle2'
  });

  await page.waitForSelector('.job-card');

  const jobs = await page.evaluate(() => {
    const jobCards = document.querySelectorAll('.job-card');
    const results = [];

    jobCards.forEach(card => {
      const title = card.querySelector('.job-title')?.innerText.trim() || 'N/A';
      const company = card.querySelector('h3')?.innerText.trim() || 'N/A';

      let description = card.querySelector('.job-description')?.innerText.trim() || "No description found";
      description = description.length > 100
        ? description.substring(0, 150) + "..."
        : description;
      description = description.replace(/(\r\n|\n|\r|\t)/gm, " ");

      const city = card.querySelector('.job-card-label.location-field')?.innerText.trim() || 'N/A';

      let salaryText = card.querySelector('.job-card-label.salary-field')?.innerText.trim() || '';
      salaryText = salaryText.replace(/\./g, '');
      const match = salaryText.match(/\d+/);
      const salary = match ? parseInt(match[0], 10) : 0;

      const url = card.querySelector('.job-card-header a')?.href || 'N/A';

      results.push({ title, company, description, city, salary, url });
    });

    return results;
  });

  console.log('Offers found:', jobs.length);
  console.log(jobs);

  await browser.close();

  return jobs; // devolver los resultados al final
};

module.exports = startBrowser;