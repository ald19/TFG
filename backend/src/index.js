const express = require('express');
const app = express();

// Configuración

// Middlewares
app.use(express.json());

// Rutas

// Servidor
app.listen(3000, () => {
    console.log('Servidor en el puerto 3000');
});