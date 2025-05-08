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

