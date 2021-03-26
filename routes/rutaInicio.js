const express = require('express'); 
const router = express();

/**
 * Respuesta de inicio del servidor
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
function respuestaInicio(req, res) {
    res.status(404).json({
        type: "error",
        msg: "Dirección no valida"
    });
}

/**
 * Acciones que se realizan por cada metodo
 */
router.get('/', respuestaInicio);
router.post('/', respuestaInicio);
router.put('/', respuestaInicio);
router.delete('/', respuestaInicio);

module.exports = router;