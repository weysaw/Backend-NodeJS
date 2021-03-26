const express = require('express'); 
const cta = require('../controladores/cuentasBancarias');
const router = express();

/**
 * Acciones de las cuentas bancarias
 */
router.post('/cuentas', cta.postCuentasBancarias);

router.get('/cuentas', cta.getCuentasBancarias);

router.get('/cuentas/saldo', cta.getConsultarSaldo);

router.post('/cuentas/saldo', cta.postDepositarSaldo);

router.put('/cuentas/saldo/retirar', cta.putRetirarSaldo);

router.put('/cuentas/transferencia', cta.putTransferencia);

router.delete('/cuentas', cta.deleteCuenta);

module.exports = router; 