//Declaración de variables 
const passport = require('./auth/passport');
const express = require('express');
const app = express();
const fs = require("fs");
const https = require("https");
const router = require(`./routes/index`);
const sequelize = require('./models').sequelize;
const cors = require('cors');

async function iniciar() {
    const HabienteBancaria = sequelize.models.HabienteBancaria;
    const User = sequelize.models.User;

    await HabienteBancaria.drop({ force: true });
    await sequelize.models.CuentaBancaria.sync({ force: true });
    await sequelize.models.CuentaHabiente.sync({ force: true });
    await HabienteBancaria.sync({ force: true });
    await User.sync({ force: true });
    await User.create({ username: "Axel", password: "1234" });
}
iniciar();

// Configurar middlewares
process.env.port = 4001;
app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.set('json spaces', 2);
app.use(express.urlencoded({ extended: true }));
/**
 * Se establece las respuestas para la direcciones
 */
app.use(router);
const llavePrivada = fs.readFileSync("private.key");
const certificado = fs.readFileSync("certificate.crt");
const credenciales = {
    key: llavePrivada,
    cert: certificado,
    passphrase: "1234" //passwd de la llave privada usado en la creación del certificado
};



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