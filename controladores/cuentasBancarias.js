const cta = require('../modelos/cuenta');
const Bancaria = require('../models').CuentaBancaria;
const Habiente = require('../models').Habiente;
const hab = require('../modelos/cuentahabiente');


const validarHabiente = async (req, res, accion) => {
    const dato = req.body;
    if (dato != undefined) {
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
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const getCuentasBancarias = async (req, res) => {
    try {
        let mensaje = [], habientes, final = [];
        const cuentas = await Bancaria.findAll();
        for (const cuenta of cuentas) {
            mensaje = []
            habientes = await cuenta.getHabiente();
            mensaje.push(cuenta);
            habientes.forEach((hab) => {
                mensaje.push({ habienteId: hab.id, nombre: hab.nombre });
            });
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
        await validarHabiente(req, res, async (dato, habiente) => {
            //Si existe el habiente se crea la cuenta
            const cuenta = await Bancaria.create({ saldo: dato.saldo });
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
 * 
 * @param {*} req 
 * @param {*} res 
 */
const agregarHabienteCuentaBancaria = async (req, res) => {
    try {
        await validarHabiente(req, res, async (dato, habiente) => {
            //Si existe el habiente y si existe la cuenta se agregan
            await habiente.addCuentaBancaria(dato.bancariaId);
            await res.send("Cuenta agregada");
        });
    } catch (error) {
        console.log(error);
        if (error.name == "SequelizeForeignKeyConstraintError") {
            res.send("Cuenta no encontrada");
        } else
            res.status(500).send("Error de servidor");
    } finally {
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
        const dato = req.body;
        if (dato != undefined && dato.saldo > 0) {
            const cuenta = await Bancaria.findOne({ where: { id: dato.id } });
            if (cuenta != null) {
                cuenta.saldo += dato.saldo;
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
        const dato = req.body;
        if (dato != undefined && dato.saldo > 0) {
            const cuenta = await Bancaria.findOne({ where: { id: dato.id } });
            //Si hay cuentas bancarias creadas lo crea
            if (cuenta != null) {
                cuenta.saldo = (cuenta.saldo <= dato.saldo) ? 0 : cuenta.saldo - dato.saldo;
                await cuenta.save()
                    .then(() => {
                        res.send("Retiro realizado con exito");
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
        const dato = req.body;
        if (dato != undefined) {
            const cuenta = await Bancaria.findOne({ where: { id: dato.id } });
            //Si hay cuentas bancarias creadas lo crea
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
const putTransferencia = (req, res) => {
    let cuenta = req.body;
    if (cta.devolverCuentas().length > 1)
        res.send(cta.transferencia(cuenta.origenId, cuenta.destinoId, cuenta.saldo));
    else
        res.send("No hay cuentas suficientes");
};
/**
 * Borra una cuenta bancaria si esta esta en 0
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor
 */
const deleteCuenta = (req, res) => {
    let id = req.body.id;
    if (cta.devolverCuentas().length > 0) {
        res.send(cta.borrarCuenta(id));
    } else
        res.send("No hay cuentas registradas")
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