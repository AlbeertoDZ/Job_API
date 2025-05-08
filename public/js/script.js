//Ruta: http://localhost:3000/offers/alloffers

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
