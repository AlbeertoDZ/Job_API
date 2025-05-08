//Función para desplegar el formulario para crear un nuevo usuario
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleForm");
  const form = document.getElementById("createUserForm");

  if (toggleBtn && form) {
    toggleBtn.addEventListener("click", () => {
      form.style.display = form.style.display === "none" ? "block" : "none";
    });
  }
});
console.log("Script loaded successfully");



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
