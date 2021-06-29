const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

//
const authRoute = require('./routes/auth.routes');
const recipesRoute = require('./routes/recipes.routes');

// Configuración
app.use(cors());
dotenv.config({path: '.env'});
require('./db/database');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Rutas
app.use('/api', authRoute);
app.use('/api/recetas', recipesRoute);

// Servidor
app.listen(3000, () => {
    console.log('Servidor en el puerto 3000');
});

module.exports = app;