//Declaración de variables 
const express = require('express');
const app = express();
const router = require(`./routes/index`);

//Configuración
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * RUTAS 
 */


/**
 * Se establece las respuestas para la direcciones
 */
app.use(router);
console.log("Iniciando");

/**
 * Inicicia el servidor
 */
app.listen(app.get('port'), () => {
    console.log(`Servidor en puerto ${app.get('port')}`);
}).on('error', err => {
    console.log("Error al iniciar el servidor", err);
});

