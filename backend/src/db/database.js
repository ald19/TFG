const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

conexion.connect((err) => {
    if(err){
        console.log('Error en la conexión: ', err);
        return;
    } else{
        console.log('Base de datos conectada.');
    }
});

module.exports = conexion;