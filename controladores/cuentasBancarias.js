const cta = require('../modelos/cuenta');
const hab = require('../modelos/cuentahabiente');
let i = 0;
/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const getCuentasBancarias = (req, res) => {
    let info = cta.devolverCuentas();
    res.json(info);
};

/**
 * Crea una cuenta bancaria
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res  Respuesta del servidor
 */
const postCuentasBancarias = (req, res) => {
    let cuenta = req.body;
    //Verificia los habientes y si se han enviado datos
    if (hab.devolverCuentas().length > 0 && cuenta != undefined) {
        //Si existe el habiente se crea la cuenta
        if (hab.buscarHabiente(cuenta.habId) != undefined) {
            i++;
            cta.agregarCuenta(i, cuenta.saldo, cuenta.habId);
            res.send("Datos agregados con exito");
        }
        else
            res.send("Habiente no encontrado");
    } else
        res.send("No hay cuentas habientes registradas o datos erroneos");
};

/**
 * Deposita el saldo a la cuenta bancaria indicada
 * 
 * @param {Object} req Solicitud del cliente 
 * @param {Object} res Respuesta del servidor
 */
const postDepositarSaldo = (req, res) => {
    let cuenta = req.body;
    //Si hay cuentas bancarias creadas lo crea
    if (cta.devolverCuentas().length > 0) {
        res.send(cta.deposito(cuenta.id, cuenta.saldo));
    } else
        res.send("No hay cuentas bancarias");
};

/**
 * Retira el saldo indicado a la cuenta que se diga
 * 
 * @param {Object} req Solicitud del cliente
 * @param {Object} res Respuesta del servidor 
 */
const putRetirarSaldo = (req, res) => {
    let cuenta = req.body;
    //Si hay cuentas bancarias entra a la condición
    if (cta.devolverCuentas().length > 0)
        res.send(cta.retirar(cuenta.id, cuenta.saldo));
    else
        res.send("No hay cuentas bancarias");
};


/**
 * Consulta el saldo de una cuenta bancaria indicada
 * 
 * @param {Object} req Solicitud del cliente 
 * @param {Object} res Respuesta del servidor
 */
const getConsultarSaldo = (req, res) => {
    let cuenta = cta.buscarCuentaBancaria(req.body.id);
    //Si existe la cuenta lo consulta
    if (cuenta != undefined)
        res.send(`Su saldo es de: ${cuenta.saldo}`);
    else
        res.send(`Cuenta no encontrada`);
};
/**
 * Hace un transferencia de una cuenta a otra
 * 
 * @param {Object} req Solicitud del cliente 
 * @param {Object} res Respuesta del servidor
 */
const putTransferencia = (req, res) => {
    let cuenta = req.body;
    if (cta.devolverCuentas().length > 1) {
        res.send(cta.transferencia(cuenta.origenId, cuenta.destinoId, cuenta.saldo));
    } else
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
    if (cta.devolverCuentas().length > 0 ) {
        res.send(cta.borrarCuenta(id));
    } else
        res.send("No hay cuentas registradas")
};
/**
 * Exportas las variables necesarias
 */
exports.getCuentasBancarias = getCuentasBancarias;
exports.postCuentasBancarias = postCuentasBancarias;
exports.postDepositarSaldo = postDepositarSaldo;
exports.getConsultarSaldo = getConsultarSaldo;
exports.putRetirarSaldo = putRetirarSaldo;
exports.putTransferencia = putTransferencia;
exports.deleteCuenta = deleteCuenta;