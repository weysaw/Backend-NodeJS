const express = require('express');
const cta = require('../controladores/cuentasBancarias');
const router = express();
const passport = require('../auth/passport');

/**
 * Acciones de las cuentas bancarias
 */
router.post("/cuentas/habiente", passport.authenticate('jwt', { session: false }), cta.agregarHabienteCuentaBancaria);

router.post('/cuentas', passport.authenticate('jwt', { session: false }), cta.postCuentasBancarias);

router.get('/cuentas', passport.authenticate('jwt', { session: false }), cta.getCuentasBancarias);

router.get('/cuentas/saldo/:id', passport.authenticate('jwt', { session: false }), cta.getConsultarSaldo);

router.post('/cuentas/saldo', cta.postDepositarSaldo);

router.post('/cuentas/saldo/retirar', passport.authenticate('jwt', { session: false }), cta.postRetirarSaldo);

router.post('/cuentas/transferencia', passport.authenticate('jwt', { session: false }), cta.postTransferencia);

router.delete('/cuentas/:id/', passport.authenticate('jwt', { session: false }), cta.deleteCuenta);

module.exports = router;