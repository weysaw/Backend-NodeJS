const express = require('express');
const cta = require('../controladores/cuentasBancarias');
const router = express();

/**
 * Acciones de las cuentas bancarias
 */
router.post("/cuentas/habiente", cta.agregarHabienteCuentaBancaria);

router.post('/cuentas', cta.postCuentasBancarias);

router.get('/cuentas', cta.getCuentasBancarias);

router.get('/cuentas/saldo/:id', cta.getConsultarSaldo);

router.post('/cuentas/saldo', cta.postDepositarSaldo);

router.post('/cuentas/saldo/retirar', cta.postRetirarSaldo);

router.post('/cuentas/transferencia', cta.postTransferencia);

router.delete('/cuentas/:id/', cta.deleteCuenta);

module.exports = router;