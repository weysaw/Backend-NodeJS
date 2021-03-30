const models = require('../models');
const Habiente = models.Habiente;

/**
 * Agrega un cuenta habiente
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const postHabientes = async (req, res) => {
    //Información recibida del cliente
    const info = req.body;
    console.log("POST habientes");
    //Crea el habiente
    await Habiente.create(info).then(() => {
        res.send("Datos Agregados Con Exito");
    }).catch(() => {
        res.send("Error en los datos");
    }).finally(() => {
        //Finaliza la respuesta
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
    try {
        //Le manda toda la información de los habientes
        res.json(await Habiente.findAll());
    } catch (error) {
        res.status(500).send("Error de servidor");
        console.error(error);
    } finally {
        res.end();
    }
};

/**
 * Modifica un dato del habientes especificado
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const putHabientes = async (req, res) => {
    try {
        //Información recibida del cliente
        const info = req.body;
        //Valida que la información sea correcta
        if (info.id != undefined && info.nombre != undefined) {
            //Busca la cuenta de habiente
            const habiente = await Habiente.findOne({ where: { id: info.id } });
            //Si encuentra el habiente modifica los datos
            if (habiente != null) {
                //Modifica el nombre del habiente
                habiente.nombre = await info.nombre;
                //Salva los dato en la BD
                await habiente.save()
                    .then(() => {
                        res.send(`Dato modificado con exito`);
                    }).catch(() => {
                        res.send(`Error al modificar el dato`);
                    })
            } else
                res.send("Habiente no encontrado");
        } else
            res.send("Datos mandados incorrectamente");
    } catch (error) {
        res.status(500).send("Error de servidor");
        console.error(error);
    } finally {
        //Finaliza la conexión
        res.end();

    }
}
/**
 * Borra la cuenta de un habientes especificado
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const deleteHabientes = async (req, res) => {
    try {
        //Información recibida del cliente
        const info = req.body.id;
        //Valida que el dato haya sido enviado correctamente
        if (info != undefined) {
            //Busca la cuenta de habiente
            const habiente = await Habiente.findOne({ where: { id: info } });
            //Si encuentra el habiente lo borra
            if (habiente != undefined) {
                //Borra al habiente de la tabla
                await habiente.destroy()
                    .then(() => {
                        res.send("Dato eliminado con exito");
                    }).catch(() => {
                        res.send("Error al eliminar el dato");
                    })
            }
            else
                res.send("Dato no encontrado");
        } else
            res.send("Datos mandados de la forma incorrecta");
    } catch (error) {
        res.status(500).send("Error de servidor");
        console.error(error);
    } finally {
        res.end();
    }
}
exports.postHabientes = postHabientes;
exports.getHabientes = getHabientes;
exports.putHabientes = putHabientes;
exports.deleteHabientes = deleteHabientes;