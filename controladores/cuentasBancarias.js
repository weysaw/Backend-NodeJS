const Bancaria = require('../modelos/cuentabancaria');


const respuesta = (tipo, msg) => {
    return { type: tipo, msg: msg };
};

const errorServidor = (res) => {
    res.status(500).json(respuesta(`error`, `Error de servidor`));
};

/**
 * Devuelve las cuentas bancarias al cliente
 * 
 * @param {Object} req Es la petición del cliente
 * @param {Object} res Es la respuesta del servidor
 */
const getCuentasBancarias = async (req, res) => {
    try {
        res.status(200).json(await Bancaria.devolverCuentas());
    } catch (error) {
        errorServidor(res);
        console.error(error);
    } finally {
        res.end();
    }

};

/**
 * Crea una cuenta bancaria
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res  Respuesta del servidor
 */
const postCuentasBancarias = async (req, res) => {
    try {
        //Información recibida del cliente
        const dato = req.body;
        await Bancaria.agregarCuenta(dato);
        res.status(200).json(respuesta(`Exito`, `Cuenta agregada`));
    } catch (error) {
        console.log(error);
        if (error.num != undefined)
            res.status(error.num).json(error);
        else
            errorServidor(res);
    } finally {
        res.end();
    }
};



/**
 * Agrega un habiente a una cuenta bancaria
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const agregarHabienteCuentaBancaria = async (req, res) => {
    try {
        //Información recibida del cliente
        const dato = req.body;
        await Bancaria.agregarHabCuenta(dato);
        res.status(200).json(respuesta(`exito`, `Habiente agregado con exito`));
    } catch (error) {
        console.error(error);
        //Verifica si el error es porque si no encuentra la relación
        if (error.name == `SequelizeForeignKeyConstraintError`)
            res.status(400).json(respuesta(`error`, `Cuenta no encontrada`));
        else if (error.num != undefined)
            res.status(error.num).json(error);
        else
            errorServidor(res);
    } finally {
        //Finaliza respuesta
        res.end();
    }
}

/**
 * Deposita el saldo a la cuenta bancaria indicada
 * 
 * @param {Object} req Solicitud del cliente 
 * @param {Object} res Respuesta del servidor
 */
const postDepositarSaldo = async (req, res) => {
    try {
        //Información del cliente
        const dato = req.body;
        // valida el saldo como el dato
        if (dato == undefined || dato.saldo <= 0)
            return res.status(400).json(respuesta(`error`, `Datos enviados de la manera incorrecta`));
        await Bancaria.deposito(dato.id, dato.saldo);
        res.status(200).json(respuesta(`exito`, `Deposito realizado con exito`));
    } catch (error) {
        console.log(error);
        if (error.num != undefined)
            res.status(error.num).json(error);
        else
            errorServidor(res);
    } finally {
        res.end();
    }
};

/**
 * Retira el saldo indicado a la cuenta que se diga
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor 
 */
const postRetirarSaldo = async (req, res) => {
    try {
        //Información del cliente
        const dato = req.body;
        //verifica si los datos son enviados correctamente
        if (dato.id == undefined || dato.saldo < 0)
            return res.status(400).json(respuesta(`error`, `Datos erroneos`));
        const mensaje = await Bancaria.retirar(dato.id, dato.saldo);
        res.status(200).json(respuesta(`exito`, mensaje));
    } catch (error) {
        console.log(error);
        if (error.num != undefined)
            res.status(error.num).json(error);
        else
            errorServidor(res);
    } finally {
        res.end();
    }
};


/**
 * Consulta el saldo de una cuenta bancaria indicada
 * 
 * @param {Object} req Solicitud del cliente 
 * @param {Object} res Respuesta del servidor
 */
const getConsultarSaldo = async (req, res) => {
    try {
        //Información del cliente
        const dato = req?.params?.id;
        //Verifica el dato si esta correcto
        if (dato == undefined)
            return res.status(400).json(respuesta(`error`, `Datos erroneos`));
        //Busca la cuenta bancaria 
        const cuenta = await Bancaria.buscarCuentaBancaria(dato);
        //Si existe la cuenta realiza las acciones
        if (cuenta != null)
            res.status(200).json(respuesta(`exito`, `Su saldo es de: ${cuenta.saldo}`));
        else
            res.status(400).json(respuesta(`error`, `Cuenta Bancaria no encontrada`));
    } catch (error) {
        errorServidor(res);
    } finally {
        res.end();
    }
};
/**
 * Hace un transferencia de una cuenta a otra
 * 
 * @param {Object} req Solicitud del cliente 
 * @param {Object} res Respuesta del servidor
 */
const postTransferencia = async (req, res) => {
    try {
        //Información del cliente
        const dato = req.body;
        //Si los datos estan correcto realiza las acciones
        if (dato == undefined || dato.saldo < 0)
            return res.status(400).json(respuesta(`error`, `datos incorrectos`));
        await Bancaria.transferencia(dato.origenId, dato.destinoId, dato.saldo);
        res.status(200).json(respuesta(`exito`, `Transferencia realizada con exito`));
    } catch (error) {
        console.error(error);
        if (error.num != undefined)
            res.status(error.num).json(error);
        else
            errorServidor(res);
    } finally {
        res.end();
    }
};
/**
 * Borra una cuenta bancaria si esta esta en 0
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const deleteCuenta = async (req, res) => {
    try {
        //Información del cliente
        const dato = req?.params?.id;
        //Si los datos son correctos realiza las acciones
        if (dato == undefined)
            return res.status(400).json(`Datos erroneos`);
        //Elimina la cuenta de la tabla
        await Bancaria.borrarCuenta(dato);
        res.status(200).json(respuesta(`exito`, `Cuenta eliminada`));
    } catch (error) {
        console.log(error);
        if (error.num != undefined)
            res.status(error.num).json(error);
        else
            errorServidor(res);
    } finally {
        res.end();
    }
};
/**
 * Exportas las variables necesarias
 */
exports.getCuentasBancarias = getCuentasBancarias;
exports.postCuentasBancarias = postCuentasBancarias;
exports.agregarHabienteCuentaBancaria = agregarHabienteCuentaBancaria;
exports.postDepositarSaldo = postDepositarSaldo;
exports.getConsultarSaldo = getConsultarSaldo;
exports.postRetirarSaldo = postRetirarSaldo;
exports.postTransferencia = postTransferencia;
exports.deleteCuenta = deleteCuenta;