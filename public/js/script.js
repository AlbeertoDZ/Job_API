
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("resultados");

  try {
    const res = await fetch("/offers/alloffers");
    const offers = await res.json();

    console.log(offers)

    const tarjetaOfertas = offers.map(offer => `
      <div class="offer-card">
        <h2>${offer.title}</h2>
        <p><strong>Empresa:</strong> ${offer.company}</p>
        <p><strong>Ciudad:</strong> ${offer.city}</p>
        <p><strong>Salario:</strong> ${offer.salary} €</p>
        <a href="${offer.url}" target="_blank" class="button">Ver oferta</a>
      </div>
    `).join("");

    container.innerHTML = tarjetaOfertas;

  } catch (error) {
    console.error("Error al cargar ofertas:", error);
  }
});

document.getElementById("offer-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = event.target.title.value;
  const company = event.target.company.value;
  const description = event.target.description.value;
  const city = event.target.city.value;
  const salary = event.target.salary.value;
  const url = event.target.url.value;
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");


  await fetch('/offers/ads', {
    method: "POST",
    body: JSON.stringify(
      {
        title,
        company,
        description,
        city,
        salary,
        url
      }
    ),
    headers: myHeaders
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("message").innerHTML = "Oferta guardada";
      console.log(data)

    })


})

