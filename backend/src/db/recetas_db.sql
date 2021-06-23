CREATE TABLE IF NOT EXISTS usuarios (
    id INT(6) AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    nickname VARCHAR(25) NOT NULL,
    email VARCHAR(100) NOT NULL, 
    contraseña VARCHAR(255) NOT NULL,
    fecha_nacimiento date NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS recetas (
    id INT(6) AUTO_INCREMENT,
    nombre VARCHAR(240) NOT NULL,
    descripcion VARCHAR(255) DEFAULT NULL,
    duracion VARCHAR(25) NOT NULL,
    valoracion DOUBLE DEFAULT 0.0,
    id_usuario INT(6) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE usuarios
    ADD UNIQUE (email);

ALTER TABLE recetas
    ADD CONSTRAINT fk_recetas_publicadas FOREIGN KEY (id_usuario) REFERENCES usuarios(id);