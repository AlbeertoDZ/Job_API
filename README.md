# Proyecto Front-Back portal empleo

![Faldón de The Bridge](/public/img/faldon-the-bridge.png)

# JobIn

JobIn es una aplicación web que simula una plataforma de búsqueda de empleo, desarrollada como proyecto colaborativo entre cuatro personas: **Alberto Diez**, **Ignacio Talvi**, **Mario López** y **Pablo Bacigalupe**.

<p align="center"><img src="public/img/logo-jobin.png" alt="Logo de JobIn" width="200"></p>

## 🛠️ Tecnologías utilizadas

- **Frontend**:  
  - Motor de vistas: [Pug](https://pugjs.org/)
  - Diseño: Mobile First, responsive

- **Backend**:  
  - [Node.js](https://nodejs.org/)  
  - [Express.js](https://expressjs.com/)

- **Bases de datos**:
  - **PostgreSQL**:
  Utilizamos una base de datos relacional en la que guardamos dos tablas:
    - `persons`: Usuarios registrados (roles `user` y `admin`)  
    - `favoritos`: Ofertas de empleo guardadas por los usuarios

  - **MongoDB Atlas**:  
    - Almacenamiento de ofertas de empleo capturadas por scraping y que luego renderizaremos en la web

- **Control de versiones**: [GitHub](https://github.com/)

## 🚀 Funcionalidades principales

- **Visualización de ofertas**:  
  Al acceder a la home se listan todas las ofertas capturadas por scraping (actualmente desde [Ticjob](https://www.ticjob.es/)). Se muestran en una vista optimizada para móviles, organizadas en columna.

<p align="center"><img src="public/img/gif-vista-home.gif" alt="Vista inicio app" width="200"></p>

- **Publicar oferta**:  
  Botón visible en la cabecera que lleva a un formulario para ingresar una nueva oferta manualmente.

<p align="center"><img src="public/img/bloggif_681cf1c384de6.gif" alt="Formulario publicar oferta" width="200"></p>

- **Enlaces externos**:  
  Cada oferta incluye un botón que redirige a la página original de donde se obtuvo la oferta.

- **Autenticación (en desarrollo)**:  
  Los botones *Iniciar sesión* y *Registrarse* ya están diseñados, pero aún no están funcionales en esta versión inicial.

## 🖼️ Diseño

El enfoque de diseño es **mobile first**, asegurando una experiencia óptima en pantallas pequeñas. Cada oferta muestra:

- Título del puesto
- Empresa que publica la oferta
- Ciudad
- Salario
- Enlace externo a la oferta original

## 📦 Instalación y ejecución

### Requisitos previos

- Node.js y npm instalados
- PostgreSQL corriendo localmente o remotamente
- Cuenta y clúster configurado en MongoDB Atlas

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/jobin.git
cd jobin
