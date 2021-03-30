//Declaración de variables 
const express = require('express');
const app = express();
const router = require(`./routes/index`);
const sequelize = require('./models').sequelize;

//Configuración
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * RUTAS 
 */
 async function iniciar() {
    await sequelize.models.HabienteBancaria.drop({ force: true });
    await sequelize.models.CuentaBancaria.sync({ force: true });
    await sequelize.models.Habiente.sync({ force: true });
    await sequelize.models.HabienteBancaria.sync({ force: true });
}

iniciar();

/**
 * Se establece las respuestas para la direcciones
 */
app.use(router);



/**
 * Inicia el servidor
 */
const servidor = app.listen(app.get('port'), () => {
    console.log(`Servidor en puerto ${app.get('port')}`);
}).on('error', err => {
    console.log("Error al iniciar el servidor", err);
});

process.on('SIGINT', () => {
    console.log(`Cerrando conexiones`);
    sequelize.close();
    servidor.close();
});