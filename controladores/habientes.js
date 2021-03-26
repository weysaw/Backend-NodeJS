const hab = require('../modelos/cuentahabiente');
let i = 0;
/**
 * Agrega un cuenta habientes
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const postHabientes = (req, res) => {
    const info = req.body.nombre;
    console.log("POST habientes");
    if (info != undefined) {
        i++;
        hab.agregarHabiente(i, info);
        res.send("Datos Agregados Con Exito");
    } else 
        res.send("Error no se mandado ningun dado");
    
};

/**
 * Devuelve las cuentas de los habientes
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const getHabientes = (req, res) => {
    res.json(hab.devolverCuentas());
};

/**
 * Modifica un dato del habientes especificado
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const putHabientes = (req, res) => {
    const info = req.body;
    if (info != undefined)
        res.status(200).send(hab.modificarHabiente(info.id, info.nombre));

}
/**
 * Borra la cuenta de un habientes especificado
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const deleteHabientes = (req, res) => {
    const info = req.body;
    if (info != undefined)
        res.status(200).send(hab.borrarHabiente(info.id));
    else
        res.status(404).send("ERROR 404");

}

exports.postHabientes = postHabientes;
exports.getHabientes = getHabientes;
exports.putHabientes = putHabientes;
exports.deleteHabientes = deleteHabientes;