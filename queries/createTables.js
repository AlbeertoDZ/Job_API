const pool = require('../config/db_pgsql');

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS persons (
        id_user SERIAL PRIMARY KEY,
        user_name VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        surname VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        user_password TEXT NOT NULL,
        rol VARCHAR(20) NOT NULL CHECK (rol IN ('user', 'admin')),
        user_image VARCHAR(200)
      );

      CREATE TABLE IF NOT EXISTS favorites (
        id_favorite SERIAL PRIMARY KEY,
        id_user INTEGER NOT NULL,
        id_offer VARCHAR(100) NOT NULL,
        category VARCHAR(100),
        city VARCHAR(100),
        FOREIGN KEY (id_user) REFERENCES persons(id_user) ON DELETE CASCADE
      );
    `);

    console.log("Tablas 'persons' y 'favorites' creadas con éxito.");
  } catch (err) {
    console.error("Error creando tablas:", err);
  } finally {
    pool.end();
  }
};

console.log("Conectando a base de datos:", process.env.DB_DATABASE);


createTables();
