const express = require('express');
const hab = require('../controladores/habientes');
const router = express();
const passport = require('../auth/passport');
/**
 * Accione que se realizan de los cuentas bancarias
 */
router.route('/habientes')
    .post(passport.authenticate('jwt', { session: false }), hab.postHabientes)
    .get(passport.authenticate('jwt', { session: false }), hab.getHabientes);

router.route('/habientes/:id/')
    .put(passport.authenticate('jwt', { session: false }), hab.putHabientes)
    .delete(passport.authenticate('jwt', { session: false }), hab.deleteHabientes);


module.exports = router;