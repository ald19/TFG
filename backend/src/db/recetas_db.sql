CREATE TABLE IF NOT EXISTS usuarios (
    id INT(6) AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    nickname VARCHAR(25) NOT NULL,
    email VARCHAR(100) NOT NULL, 
    contraseña VARCHAR(255) NOT NULL,
    fecha_nacimiento date NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS recetas (
    id INT(6) AUTO_INCREMENT,
    nombre VARCHAR(240) NOT NULL,
    descripcion VARCHAR(255) DEFAULT NULL,
    duracion VARCHAR(25) DEFAULT NULL,
    extra VARCHAR(255) DEFAULT NULL,
    valoracion DOUBLE DEFAULT 0.0,
    id_usuario INT(6) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pasos (
    id INT(6) AUTO_INCREMENT,
    descripcion VARCHAR(500) NOT NULL,
    id_receta INT(6) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_receta) REFERENCES recetas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS alimentos (
    id INT(6) AUTO_INCREMENT,
    nombre VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS alimentos_recetas (
    id INT(6) AUTO_INCREMENT,
    id_alimento INT(6) NOT NULL,
    id_receta INT(6) NOT NULL,
    cantidad INT(6) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_alimento) REFERENCES alimentos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_receta) REFERENCES recetas(id) ON DELETE CASCADE,
    UNIQUE (id_alimento, id_receta)
);