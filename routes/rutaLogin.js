const express = require('express');
const router = express();
const loginControlador = require('../controladores/loginController');

/**
 * Acciones del login
 */
router.post("/login", loginControlador.login);

module.exports = router;