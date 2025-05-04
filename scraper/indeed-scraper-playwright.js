const { chromium } = require("playwright");
const { MongoClient } = require("mongodb");
require("dotenv").config();

//https://jobtoday.com/es/trabajos_f_sin-experiencia/spain

const readWrite = async () => {

    const browser = await chromium.launch(
        {
            headless: true, // Cambia a false si quieres ver el navegador
            //slowMo: 100, 
            //devtools: true 
        }
    )

    const page = await browser.newPage()

    await page.goto('https://es.indeed.com/jobs?q=desarrollador+web&l=Espa%C3%B1a&from=searchOnHP%2Cwhatautocomplete&vjk=b6ed137fe88cc45a', { waitUntil: 'networkidle', timeout: 60000 });


    // Espera aleatoria
    await page.waitForTimeout(3000);

    // Extrae datos de la página
    const jobs = await page.evaluate(() => {
        const jobCards = Array.from(document.querySelectorAll('[class*="job_seen_beacon"], .job_seen_beacon'));
        const jobsList = [];

        jobCards.forEach(jobCard => {
            const titleElement = jobCard.querySelector('h2.jobTitle')?.innerText ||
                jobCard.querySelector('[class*="jobTitle"]')?.innerText ||
                jobCard.querySelector('a[id^="job_"]')?.innerText;
            const title = titleElement ? titleElement.innerText.trim() : 'Titulo no encontrado';

            const companyElement = jobCard.querySelector('[data-testid="company-name"], .company-name')?.innerText ||
                jobCard.querySelector('.company_location .companyName')?.innerText;
            const company = companyElement ? companyElement.innerText.trim() : 'Compañia no encontrada';

            const descriptionElement = jobCard.querySelector('[class*="job-snippet"], .job-snippet')?.innerText ||
                jobCard.querySelector('.job-snippet-container')?.innerText;
            const description = descriptionElement ? descriptionElement.innerText.trim() : 'Descripción no encontrada';

            const locationElement = jobCard.querySelector('[data-testid="text-location"], .company_location')?.innerText ||
                jobCard.querySelector('.location')?.innerText;
            const location = locationElement ? locationElement.innerText.trim() : 'Localización no encontrada';

            const salaryElement = jobCard.querySelector('[class*="salary-snippet"], .metadata.salary')?.innerText ||
                jobCard.querySelector('.salaryOnly')?.innerText || 'No especificado';
            const salary = salaryElement ? salaryElement.innerText.trim() : 'Salario no encontrado';


            jobsList.push({
                title,
                company,
                description,
                location,
                salary
            })
        })
        

        return jobsList
    })
    console.log(jobs);
    await browser.close()
};
readWrite()