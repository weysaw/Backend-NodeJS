const Habiente = require('../modelos/cuentahabiente');

const respuesta = (tipo, msg) => {
    return { type: tipo, msg: msg };
};

const errorServidor = (res) => {
    res.status(500).json(respuesta(`error`, `Error de servidor`));
};
/**
 * Agrega un cuenta habiente
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const postHabientes = async (req, res) => {
    //Información recibida del cliente
    try {
        await Habiente.agregaCuentarHabiente(req.body)
        res.status(200).json(respuesta(`exito`, `Datos agregados con exito`));
    } catch (error) {
        res.status(500).json(respuesta(`error`, `error en los datos`));
    } finally {
        res.end();
    }


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
        res.json(await Habiente.devolverCuentas());
    } catch (error) {
        errorServidor(res);
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
        const info = req?.params;
        info.nombre = req?.body.nombre;
        //Valida que la información sea correcta
        if (info.id == undefined || info.nombre == undefined)
            return res.status(400).json(respuesta(`error`, `Datos mandados incorrectamente`));
        await Habiente.modificarHabiente(info.id, info.nombre);
        res.status(200).json(respuesta(`exito`, `Dato modificado con exito`));
    } catch (error) {
        console.error(error);
        if (error.num != undefined)
            res.status(error.num).json(respuesta(error.type, error.msg));
        else
            errorServidor(res);
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
        const info = req?.params?.id;
        //Valida que el dato haya sido enviado correctamente
        if (info == undefined)
            return res.status(400).json(`Datos mandados de la forma incorrecta`);
        await Habiente.borrarHabiente(info);
        res.status(200).json(respuesta(`exito`, `Dato eliminado con exito`));
    } catch (error) {
        console.error(error);
        if (error.name == `SequelizeForeignKeyConstraintError`)
            res.status(400).json(respuesta(400, "No se puede borrar el habiente porque tiene una cuenta bancaria"));
        else if (error.num != undefined)
            res.status(error.num).json(respuesta(error.type, error.msg));
        else
            errorServidor(res);
    } finally {
        res.end();
    }
}
exports.postHabientes = postHabientes;
exports.getHabientes = getHabientes;
exports.putHabientes = putHabientes;
exports.deleteHabientes = deleteHabientes;