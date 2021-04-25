const express = require('express');
const hab = require('../controladores/habientes');
const router = express();
/**
 * Accione que se realizan de los cuentas bancarias
 */
router.route('/habientes')
    .post(hab.postHabientes)
    .get(hab.getHabientes);

router.route('/habientes/:id/')
    .put(hab.putHabientes)
    .delete(hab.deleteHabientes);


module.exports = router;