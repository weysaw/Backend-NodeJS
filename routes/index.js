const router = require('express')();
const routerCH = require(`./rutasHabientes`);
const routerCB = require(`./rutaCuentasBancarias`);

/**
 * Procesos en las cuentas bancarias
 */
router.use(routerCB);

/**
 * Procesos CRUD en los cuentahabientes
 */
router.use(routerCH);

/**
 * Se establece las respuestas para direcciones que no existen
 */
 router.use('/', (req, res) => {
    res.status(404).json({
        type: "error",
        msg: "Dirección no valida"
    });
});

module.exports = router;