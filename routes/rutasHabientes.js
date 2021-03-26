const express = require('express'); 
const hab = require('../controladores/habientes');
const router = express();
/**
 * Accione que se realizan de los cuentas bancarias
 */
router.post('/habientes', hab.postHabientes);

router.get('/habientes', hab.getHabientes);

router.put('/habientes', hab.putHabientes);

router.delete('/habientes', hab.deleteHabientes);

module.exports = router; 