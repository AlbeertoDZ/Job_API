--Crear tabla personas
CREATE TABLE persons (
    id_user SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    user_password TEXT NOT NULL,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('user', 'admin')),
    user_image VARCHAR(200)
);

--Crear tabla favoritos
CREATE TABLE favorites (
    id_favorite SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL,
    id_offer VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES personas(id_user) ON DELETE CASCADE
);