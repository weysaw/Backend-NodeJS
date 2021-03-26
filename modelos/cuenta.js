//Arreglo de cuentas
const cuentas = [];

/**
 * Plantilla de las cuentas bancarias
 */
class CuentaBancaria {
    constructor(id, saldo, cuentaId) {
        this.id = id;
        this.saldo = saldo;
        this.cuentasId = [cuentaId];
    }
    /**
     * Retira el saldo indicado de la cuenta
     * 
     * @param {number} salRet Es el saldo a retirar 
     */
    retirarSaldo(salRet) {
        if (salRet <= this.saldo)
            this.saldo -= salRet;
        else
            this.saldo = 0;
    }
}
/**
 * Agrega una cuenta bancaria nueva al arreglo
 * 
 * @param {number} id Identificador de la cuenta
 * @param {number} saldo Saldo inicial de la cuenta
 * @param {number} cuentasId Cuentas Habientes que estan asociados a la cuenta bancaria
 */
const agregarCuenta = (id, saldo, cuentaId) => {
    //Se inserta al arreglo la cuenta
    cuentas.push(new CuentaBancaria(id, saldo, cuentaId));
}

/**
 * Devuelve el arreglo de cuentas
 * 
 * @returns Es el arreglo 
 */
const devolverCuentas = () => {
    return cuentas;
}
/**
 * Busca la cuenta bancaria en el arreglo
 * 
 * @param {number} id 
 * @returns La cuenta que se encuentre si no devuelve undefined 
 */
const buscarCuentaBancaria = (id) => {
    return cuentas.find(cuenta => cuenta.id === id);
}
/**
 * Deposita en la cuenta bancaria
 * 
 * @param {number} id  Es el identificador de la cuenta
 * @param {number} saldo Es el saldo que se agregara
 * @returns Devuelve el mensaje de lo que sucedio
 */
const deposito = (id, saldo) => {
    let cuenta = buscarCuentaBancaria(id);
    //Debe de encontrar una cuenta y el saldo debe ser positivo para deposites
    if (cuenta != undefined && saldo > 0) {
        cuenta.saldo += saldo;
        console.log("Deposito realizado con exito");
        return "Deposito realizado con exito";
    } else {
        console.log("Dato no encontrado");
        return "Dato no encontrado o saldo erroneo";
    }
}
/**
 * Retira dinero de la cuenta bancaria
 * 
 * @param {number} id Identificador de la cuenta 
 * @param {number} saldo Es el saldo a retirar de la cuenta
 * @returns Mensaje que lo que haya pasado
 */
const retirar = (id, saldo) => {
    let cuenta = buscarCuentaBancaria(id);
    if (cuenta != undefined && saldo > 0) {
        cuenta.retirarSaldo(saldo);
        return "Retiro realizado con exito";
    } else 
        return "Dato no encontrado";
}
/**
 * Transfiere saldo de una cuenta a otra
 * 
 * @param {number} origen Es el identificador de la cuenta de origen 
 * @param {number} destino Es el idetificador de la cuenta a destino
 * @param {number} saldo Es el saldo que se transferira
 * @returns 
 */
const transferencia = (origen, destino, saldo) => {
    let cuentaOrigen = buscarCuentaBancaria(origen);
    let cuentaDestino = buscarCuentaBancaria(destino);

    if (cuentaOrigen != undefined && cuentaDestino != undefined) {
        if (saldo > cuentaOrigen.saldo)
            saldo = cuentaOrigen.saldo;
        cuentaDestino.saldo += saldo;
        cuentaOrigen.retirarSaldo(saldo);
        return "Transferencia con exito";
    } else
        return "Cuenta no encontrada";

};

/**
 * Borra la cuenta bancaria indicada si esta en 0 
 * 
 * @param {number} id Identificador de la cuenta bancaria
 * @returns Devuelve el mensaje de los que haya pasado
 */
const borrarCuenta = (id) => {
    let cuenta = buscarCuentaBancaria(id);
    if (cuenta != undefined) {
        if (cuenta.saldo == 0) {
            cuentas.splice(cuentas.indexOf(cuenta), 1);
            return "Cuenta eliminada con exito";
        } else 
            return "Cuenta no esta en 0 el saldo";
    }
    return "Cuenta no encontrada";
};

/**
 * Exporta la variables importantes
 */
exports.agregarCuenta = agregarCuenta;
exports.devolverCuentas = devolverCuentas;
exports.buscarCuentaBancaria = buscarCuentaBancaria;
exports.deposito = deposito;
exports.retirar = retirar;
exports.transferencia = transferencia;
exports.borrarCuenta = borrarCuenta;