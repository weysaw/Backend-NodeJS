const models = require('../models');
const Habiente = models.Habiente;

/**
 * Agrega un cuenta habientes
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const postHabientes = async (req, res) => {
    const info = req.body;
    console.log("POST habientes");

    await Habiente.create(info).then(() => {
        res.send("Datos Agregados Con Exito");
    }).catch(() => {
        res.send("Error en los datos");
    }).finally(() => {
        res.end();
    })
};

/**
 * Devuelve las cuentas de los habientes
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const getHabientes = async (req, res) => {
    res.json(await Habiente.findAll());
    res.end();
};

/**
 * Modifica un dato del habientes especificado
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const putHabientes = async (req, res) => {
    const info = req.body;
    const habiente = await Habiente.findOne({
        where: { id: info.id }
    });
    if (habiente != undefined) {
        habiente.nombre = await info.nombre;
        await habiente.save()
            .then(() => {
                res.send(`Dato modificado con exito`);
            }).catch(() => {
                res.send(`Error al modificar el dato`);
            })
    } else
        res.send("Dato no encontrado");
    res.end();
}
/**
 * Borra la cuenta de un habientes especificado
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const deleteHabientes = async (req, res) => {
    const info = req.body;
    const habiente = await Habiente.findOne({
        where: { id: info.id }
    });

    if (habiente != undefined) {
        await habiente.destroy()
            .then(() => {
                res.send("Dato eliminado con exito");
            }).catch(() => {
                res.send("Error al eliminar el dato");
            })
    }
    else
        res.send("Dato no encontrado");
    res.end();
}
exports.postHabientes = postHabientes;
exports.getHabientes = getHabientes;
exports.putHabientes = putHabientes;
exports.deleteHabientes = deleteHabientes;