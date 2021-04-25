const Bancaria = require(`../models`).CuentaBancaria;
const Habiente = require('../modelos/cuentahabiente');

/**
 * Se utiliza para validar los habientes
 * 
 * @param {Object} req Es la petición del cliente
 * @param {Object} res Es la respuesta del servidor
 * @param {Object} accion Función que realiza acciones diferentes
 */
const validarHabiente = async (dato, accion) => {
    if (dato.habienteId == undefined)
        throw { num: 400, type: `error`, msg: `datos erroneos` };
    //Verifica los habientes y si se han enviado datos
    const habiente = await Habiente.buscarHabiente(dato.habienteId);

    if (habiente == null)
        throw { num: 400, type: `error`, msg: `Habiente no encontrado` };

    if (await accion(dato, habiente) == undefined)
        throw { num: 400, type: `error`, msg: `Dato repetido no se agrego` };
}

/**
 * Agrega una cuenta bancaria nueva al arreglo
 * 
 * @param {number} id Identificador de la cuenta
 * @param {number} saldo Saldo inicial de la cuenta
 * @param {number} cuentasId Cuentas Habientes que estan asociados a la cuenta bancaria
 */
const agregarCuenta = async (info) => {
    //Se utiliza para validar los habientes
    await validarHabiente(info, async (dato, habiente) => {
        //Si existe el habiente se crea la cuenta
        const cuenta = await Bancaria.create({ saldo: dato.saldo });
        //Agrega la cuenta bancaria al habiente
        return habiente.addCuentaBancaria(cuenta);
    });
}

/**
 * Devuelve un json con las cuentas bancarias
 * 
 * @returns Son los datos  
 */
const devolverCuentas = async () => {
    let mensaje, habientes, final = [];
    let datos;
    //Devuelve todas cuentas existentes
    const cuentas = await Bancaria.findAll();
    //Recorre por todas las cuentas y todos los habientes
    for (const cuenta of cuentas) {
        mensaje = [];
        datos = [];
        habientes = await cuenta.getCuentaHabiente();
        mensaje.push(cuenta);
        //Recorre los habientes de la cuenta
        for (const hab of habientes)
            datos.push({ habienteId: hab.id, nombre: hab.nombre });
        mensaje.push(datos);
        final.push(mensaje);
    }
    return final;
}
/**
 * Busca la cuenta bancaria en el arreglo
 * 
 * @param {number} id 
 * @returns La cuenta que se encuentre si no devuelve undefined 
 */
const buscarCuentaBancaria = (id) => {
    return Bancaria.findOne({ where: { id: id } });
}
/**
 * 
 * @param {*} info 
 * @returns 
 */
const agregarHabCuenta = async (info) => {
    //Si encuentra al habiente ejecuta la función
    await validarHabiente(info, (dato, habiente) => {
        //Si existe el habiente y si existe la cuenta se agregan
        return habiente.addCuentaBancaria(dato.bancariaId);
    });

}
/**
 * Deposita en la cuenta bancaria
 * 
 * @param {number} id  Es el identificador de la cuenta
 * @param {number} saldo Es el saldo que se agregara
 * @returns Devuelve el mensaje de lo que sucedio
 */
const deposito = async (id, saldo) => {
    // busca la cuenta bancaria con el dato especificado
    const cuenta = await buscarCuentaBancaria(id);
    // si no encuentra la cuenta se lo indica
    if (cuenta == null)
        throw { num: 400, type: `error`, msg: `Cuentas bancaria no encontrada` };
    //deposita a la cuenta
    cuenta.saldo += saldo;
    //salva los datos a la BD
    await cuenta.save();
}
/**
 * Retira dinero de la cuenta bancaria
 * 
 * @param {number} id Identificador de la cuenta 
 * @param {number} saldo Es el saldo a retirar de la cuenta
 * @returns Mensaje que lo que haya pasado
 */
const retirar = async (id, saldo) => {
    const cuenta = await buscarCuentaBancaria(id);
    //Si encuentra la cuenta realiza las acciones
    if (cuenta == null)
        throw { num: 400, type: `error`, msg: `Cuenta Bancaria no encontrada` };
    //Verifica si el saldo a retirar es mayor
    if (cuenta.saldo <= saldo)
        saldo = cuenta.saldo;
    cuenta.saldo -= saldo;
    await cuenta.save();
    return `Retiro realizado con exito, su retiro fue de ${saldo}`;
}
/**
 * Transfiere saldo de una cuenta a otra
 * 
 * @param {number} origen Es el identificador de la cuenta de origen 
 * @param {number} destino Es el idetificador de la cuenta a destino
 * @param {number} saldo Es el saldo que se transferira
 * @returns 
 */
const transferencia = async (origen, destino, saldoTransferir) => {
    //Busca la cuenta de origen de la transferencia
    const cuentaOrigen = await buscarCuentaBancaria(origen);
    //Busca la cuenta de destino de la transferencia
    const cuentaDestino = await buscarCuentaBancaria(destino);
    //Saldo nuevo de la cuenta
    if (cuentaOrigen == null || cuentaDestino == null)
        throw { num: 400, type: `error`, msg: `Cuenta Bancaria no encontrada` };
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
    await cuentaOrigen.save();
    await cuentaDestino.save();
};

/**
 * Borra la cuenta bancaria indicada si esta en 0 
 * 
 * @param {number} id Identificador de la cuenta bancaria
 * @returns Devuelve el mensaje de los que haya pasado
 */
const borrarCuenta = async (id) => {
    //Busca la cuenta con el dato especificado
    const cuenta = await buscarCuentaBancaria(id);
    if (cuenta == null)
        throw { num: 400, type: `error`, msg: `Cuenta Bancaria no encontrada` };
    if (cuenta.saldo != 0)
        throw { num: 400, type: `error`, msg: `Cuenta Bancaria no esta en ceros` };
    //Devuelve los habientes relacionados a la cuenta
    const habientes = await cuenta.getCuentaHabiente();
    //Remueve los habientes de la cuenta
    cuenta.removeCuentaHabiente(habientes);
    //Si encuentra la cuenta y si esta en ceros la borra
    await cuenta.destroy();
};

/**
 * Exporta la variables importantes
 */
exports.agregarCuenta = agregarCuenta;
exports.devolverCuentas = devolverCuentas;
exports.buscarCuentaBancaria = buscarCuentaBancaria;
exports.agregarHabCuenta = agregarHabCuenta;
exports.deposito = deposito;
exports.retirar = retirar;
exports.transferencia = transferencia;
exports.borrarCuenta = borrarCuenta;