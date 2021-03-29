const router = require('express')();
const routerInicio = require(`./rutaInicio`);
const routerCH = require(`./rutasHabientes`);
const routerCB = require(`./rutaCuentasBancarias`);
/**
 * Se establece las respuestas para la dirección normal
 */
 router.use(routerInicio);
 
 /**
  * Procesos en las cuentas bancarias
  */
 router.use(routerCB);
     
 /**
  * Procesos CRUD en los cuentahabientes
  */
  router.use(routerCH);

  module.exports = router;