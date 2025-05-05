/*
const { chromium } = require("playwright");
const { MongoClient } = require("mongodb");
require("dotenv").config();

//https://jobtoday.com/es/trabajos_f_sin-experiencia/spain

const readWrite = async () => {

    const browser = await chromium.launch(
        {
            headless: false, // Cambia a false si quieres ver el navegador
            //slowMo: 100, 
            //devtools: true 
        }
    )

    const page = await browser.newPage()

    await page.goto('https://es.indeed.com/jobs?q=desarrollador+web&l=Espa%C3%B1a&from=searchOnHP%2Cwhatautocomplete&vjk=b6ed137fe88cc45a', { waitUntil: 'networkidle', timeout: 60000 });


    // Espera aleatoria
    await page.waitForTimeout(6000);

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
*/

const { chromium } = require("playwright");
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Configuración mejorada para evitar detección
const readWrite = async () => {
    const browser = await chromium.launch({
        headless: false, // Mejor mantener en false para debugging
        slowMo: 100, // Añade delays entre acciones
        args: [
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            '--disable-infobars',
            '--window-size=1280,720'
        ]
    });

    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
        locale: 'es-ES',
        timezoneId: 'Europe/Madrid',
        viewport: { width: 1280, height: 720 }
    });

    const page = await context.newPage();
    
    // Eliminar la propiedad navigator.webdriver
    await page.addInitScript(() => {
        delete navigator.__proto__.webdriver;
    });

    // Navegar a la página con comportamiento más humano
    try {
        await page.goto('https://es.indeed.com', { 
            waitUntil: 'domcontentloaded',
            timeout: 30000 
        });
        
        // Espera aleatoria entre 3-8 segundos
        await page.waitForTimeout(Math.random() * 5000 + 3000);
        
        // Simular comportamiento humano: mover mouse, scroll, etc.
        await page.mouse.move(Math.random() * 100, Math.random() * 100);
        await page.evaluate(() => {
            window.scrollBy(0, Math.random() * 500 + 200);
        });
        
        // Ahora navegar a la búsqueda específica
        await page.goto('https://es.indeed.com/jobs?q=desarrollador+web&l=Espa%C3%B1a&from=searchOnHP%2Cwhatautocomplete&vjk=b6ed137fe88cc45a', {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
        
        // Más esperas aleatorias
        await page.waitForTimeout(Math.random() * 4000 + 2000);
        
        // Extraer datos
        const jobs = await page.evaluate(() => {
            const jobCards = Array.from(document.querySelectorAll('[class*="job_seen_beacon"], .job_seen_beacon'));
            return jobCards.map(jobCard => {
                return {
                    title: jobCard.querySelector('h2.jobTitle')?.innerText.trim() || 'Título no encontrado',
                    company: jobCard.querySelector('[data-testid="company-name"]')?.innerText.trim() || 'Compañía no encontrada',
                    description: jobCard.querySelector('.job-snippet')?.innerText.trim() || 'Descripción no encontrada',
                    location: jobCard.querySelector('[data-testid="text-location"]')?.innerText.trim() || 'Localización no encontrada',
                    salary: jobCard.querySelector('[class*="salary-snippet"]')?.innerText.trim() || 'No especificado'
                };
            });
        });
        
        console.log(jobs);
    } catch (error) {
        console.error('Error durante el scraping:', error);
    } finally {
        await browser.close();
    }
};

readWrite();