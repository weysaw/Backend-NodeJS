//Declaración de variables 
const express = require('express');
const app = express();
const fs = require("fs");
const https = require("https");
const router = require(`./routes/index`);
const sequelize = require('./models').sequelize;

const llavePrivada = fs.readFileSync("private.key");
const certificado = fs.readFileSync("certificate.crt");
const credenciales = {
    key: llavePrivada,
    cert: certificado,
    passphrase: "1234" //passwd de la llave privada usado en la creación del certificado
};


//Configuración
process.env.port = 4001;
app.set('json spaces', 2);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * RUTAS 
*/
async function iniciar() {
    await sequelize.models.HabienteBancaria.drop({ force: true });
    await sequelize.models.CuentaBancaria.sync({ force: true });
    await sequelize.models.CuentaHabiente.sync({ force: true });
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
const httpsServer = https.createServer(credenciales, app);
const servidor = httpsServer.listen(process.env.port, () => {
    console.log('Servidor https escuchando por el puerto:', process.env.port);
}).on('error', err => {
    console.log('Error al inciar el servidor:', err);
});

process.on('SIGINT', () => {
    console.log(`Cerrando conexiones`);
    sequelize.close();
    servidor.close();
});