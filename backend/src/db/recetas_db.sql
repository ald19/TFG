CREATE TABLE usuarios (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    nickname VARCHAR(25) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE KEY, 
    contraseña VARCHAR(255) NOT NULL,
    fecha_nacimiento date NOT NULL
)