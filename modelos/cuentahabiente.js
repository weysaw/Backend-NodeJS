//Arreglo de habientes
const habientes = [];
/**
 * Plantilla de una cuenta habiente
 */
class CuentaHabiente {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }
    agregarCuentaBancaria(dato) {
        this.cuentas.push(dato);
    }
}
/**
 * Agrega una cuenta habiente
 * 
 * @param {number} id Es el identificador de la cuenta
 * @param {String} nombre Es el nombre del propietario de la cuenta
 */
const agregarCuentaHabiente = (id, nombre) => {
    habientes.push(new CuentaHabiente(id, nombre));
}
/**
 * Devuelve la info de la cuenta habientes
 * 
 * @returns El arreglo de habientes
 */
const devolverCuentas = () => {
    return habientes;
}

/**
 * Busca el habiente en el arreglo
 * 
 * @param {number} id Es identificador de la cuenta 
 * @returns El habiente si es encontrado lo devuelve si no devuelve undefined
 */
const buscarHabiente = (id) => {
    return habientes.find((habiente) => habiente.id === id);
}
/**
 * Modifica los datos de la cuenta habiente especificado
 * 
 * @param {Number} id Es el identificador de la cuenta
 * @param {String} nombre Es el nombre del propietario de la cuenta
 * @returns El mensaje del resultado
 */
const modificarHabiente = (id, nombre) => {
    let habiente = buscarHabiente(id);
    console.log(habiente);
    if (habiente != undefined) {
        habiente.nombre = nombre;
        return "Dato modificado con exito";
    } else
        return "Dato no encontrado";
}
/**
 * Borra el habiente indicado
 * 
 * @param {number} id Es el identificador de la cuenta
 * @returns El mensaje del resultado 
 */
const borrarHabiente = (id) => {
    let habiente = buscarHabiente(id);
    if (habiente != undefined) {
        habientes.splice(habientes.indexOf(habiente), 1);
        return "Dato eliminado con exito";
    }
    return "Dato no encontrado";

}


//Exporta los datos que se necesitan
exports.agregarHabiente = agregarCuentaHabiente;
exports.buscarHabiente = buscarHabiente;
exports.devolverCuentas = devolverCuentas;
exports.modificarHabiente = modificarHabiente;
exports.borrarHabiente = borrarHabiente;