const Bancaria = require('../models').CuentaBancaria;
const Habiente = require('../models').Habiente;

/**
 * Se utiliza para validar los habientes
 * 
 * @param {Object} req Es la petición del cliente
 * @param {Object} res Es la respuesta del servidor
 * @param {Object} accion Función que realiza acciones diferentes
 */
const validarHabiente = async (req, res, accion) => {
    //Información recibida del cliente
    const dato = req.body;
    if (dato.habienteId != undefined) {
        const habiente = await Habiente.findOne({ where: { id: dato.habienteId } });
        //Verifica los habientes y si se han enviado datos
        if (habiente != null)
            await accion(dato, habiente);
        else
            res.send("Cuenta habientes no encontrada o datos erroneos");
    } else
        res.send("Datos enviados de la manera incorrecta");
}

/**
 * Devuelve las cuentas bancarias al cliente
 * 
 * @param {Object} req Es la petición del cliente
 * @param {Object} res Es la respuesta del servidor
 */
const getCuentasBancarias = async (req, res) => {
    try {
        let mensaje, habientes, final = [];
        //Devuelve todas cuentas existentes
        const cuentas = await Bancaria.findAll();
        //Recorre por todas las cuentas y todos los habientes
        for (const cuenta of cuentas) {
            mensaje = []
            habientes = await cuenta.getHabiente();
            mensaje.push(cuenta);
            //Recorre los habientes de la cuenta
            for (const hab of habientes)
                mensaje.push({ habienteId: hab.id, nombre: hab.nombre });
            final.push(mensaje);
        }
        await res.json(final);
    } catch (error) {
        res.status(500).send("Error de servidor");
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
        //Se utiliza para validar los habientes
        await validarHabiente(req, res, async (dato, habiente) => {
            //Si existe el habiente se crea la cuenta
            const cuenta = await Bancaria.create({ saldo: dato.saldo });
            //Agrega la cuenta bancaria al habiente
            await habiente.addCuentaBancaria(cuenta);
            res.send("Cuenta agregada");
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de servidor");
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
        //Si encuentra al habiente ejecuta la función
        await validarHabiente(req, res, async (dato, habiente) => {
            //Si existe el habiente y si existe la cuenta se agregan
            await habiente.addCuentaBancaria(dato.bancariaId);
            await res.send("Cuenta agregada");
        });
    } catch (error) {
        console.log(error);
        //Verifica si el error es porque si no encuentra la relación
        if (error.name == "SequelizeForeignKeyConstraintError") {
            res.send("Cuenta no encontrada");
        } else
            res.status(500).send("Error de servidor");
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
        if (dato != undefined && dato.saldo > 0) {
            // busca la cuenta bancaria con el dato especificado
            const cuenta = await Bancaria.findOne({ where: { id: dato.id } });
            // si encuentra la cuenta realiza los demas
            if (cuenta != null) {
                //deposita a la cuenta
                cuenta.saldo += dato.saldo;
                //salva los datos a la BD
                await cuenta.save()
                    .then(() => {
                        res.send("Deposito realizado con exito");
                    }).catch(() => {
                        res.send("Error al depositar");
                    });
            } else
                res.send("No hay cuentas bancarias");
        } else
            res.send("Datos enviados de la manera incorrecta");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de servidor");
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
const putRetirarSaldo = async (req, res) => {
    try {
        //Información del cliente
        const dato = req.body;
        //verifica si los datos son enviados correctamente
        if (dato.id != undefined && dato.saldo > 0) {
            const cuenta = await Bancaria.findOne({ where: { id: dato.id } });
            //Si encuentra la cuenta realiza las acciones
            if (cuenta != null) {
                //Verifica si el saldo a retirar es mayor
                if (cuenta.saldo <= dato.saldo)
                    dato.saldo = cuenta.saldo;
                cuenta.saldo -= dato.saldo;
                await cuenta.save()
                    .then(() => {
                        res.send(`Retiro realizado con exito, su retiro fue de ${dato.saldo}`);
                    }).catch(() => {
                        res.send("Error al depositar");
                    });
            } else
                res.send("Cuenta Bancaria no encontrada");
        } else
            res.send("Datos erroneos");

    } catch (error) {
        console.log(error);
        res.status(500).send("Error de servidor");
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
        const dato = req.body.id;
        //Verifica el dato si esta correcto
        if (dato != undefined) {
            //Busca la cuenta bancaria 
            const cuenta = await Bancaria.findOne({ where: { id: dato } });
            //Si existe la cuenta realiza las acciones
            if (cuenta != null)
                res.send(`Su saldo es de: ${cuenta.saldo}`);
            else
                res.send("Cuenta Bancaria no encontrada");
        } else
            res.send("Datos erroneos");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de servidor");
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
const putTransferencia = async (req, res) => {
    try {
        //Información del cliente
        const dato = req.body;
        //Saldo nuevo de la cuenta
        let saldoTransferir = dato.saldo;
        //Si los datos estan correcto realiza las acciones
        if (dato != undefined && saldoTransferir > 0) {
            //Busca la cuenta de origen de la transferencia
            const cuentaOrigen = await Bancaria.findOne({ where: { id: dato.origenId } });
            //Busca la cuenta de destino de la transferencia
            const cuentaDestino = await Bancaria.findOne({ where: { id: dato.destinoId } });
            //Si encuentra las cuentas ejecuta las acciones
            if (cuentaOrigen != null && cuentaDestino != null) {
                //Es el saldo de la cuenta de origen
                const saldoOrigen = cuentaOrigen.saldo;
                //Si el saldo a transferir es mayor a lo que tiene la cuenta bancaria significa que se vacia
                if (saldoTransferir > saldoOrigen)
                    saldoTransferir = saldoOrigen;
                //Transfiere el dinero
                cuentaDestino.saldo += saldoTransferir;
                //Quita el dinero de la cuenta que transifirio
                cuentaOrigen.saldo -= saldoTransferir;
                //Guarda los datos en la BD
                await cuentaOrigen.save()
                    .then(async () => {
                        await cuentaDestino.save().then(() => {
                            res.send("Transferencia realizada con exito");
                        }).catch(() => {
                            res.send("Error en la transferencia");
                        });
                    }).catch(() => {
                        res.send("Error en la transferencia");
                    });
            }
            else
                res.send("Cuentas no encontradas");
        } else
            res.send("Datos enviados de la manera incorrecta");

    } catch (error) {
        console.log(error);
        res.status(500).send("Error de servidor");
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
        const dato = req.body.id;
        //Si los datos son correctos realiza las acciones
        if (dato != undefined) {
            //Busca la cuenta con el dato especificado
            const cuenta = await Bancaria.findOne({ where: { id: dato } });
            //Si encuentra la cuenta y si esta en ceros la borra
            if (cuenta != null && cuenta.saldo == 0) {
                //Devuelve los habientes relacionados a la cuenta
                const habientes = await cuenta.getHabiente();
                //Remueve los habientes de la cuenta
                cuenta.removeHabiente(habientes);
                //Elimina la cuenta de la tabla
                await cuenta.destroy()
                    .then(() => {
                        res.send("Cuenta eliminada");
                    }).catch((e) => {
                        res.send("Error al eliminar cuenta");
                        console.log(e);
                    });
            } else
                res.send("Cuenta no encontrada o no esta en ceros");
        } else
            res.send(`Datos erroneos`);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de servidor");
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
exports.putRetirarSaldo = putRetirarSaldo;
exports.putTransferencia = putTransferencia;
exports.deleteCuenta = deleteCuenta;