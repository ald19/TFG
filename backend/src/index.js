const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

const app = express();

// Configuración
dotenv.config({path:  '.env'});
const conexion = require('./db/database');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));

// Rutas

// Servidor
app.listen(3000, () => {
    console.log('Servidor en el puerto 3000');
});