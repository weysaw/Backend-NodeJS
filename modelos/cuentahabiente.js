const Habiente = require(`../models`).CuentaHabiente;
/**
 * Agrega una cuenta habiente
 * 
 * @param {Object} info es el habiente a agregar
 */
const agregarCuentaHabiente = (info) => {
    //Crea el habiente
    return Habiente.create(info);
}
/**
 * Devuelve la info de la cuenta habientes
 * 
 * @returns El arreglo de habientes
 */
const devolverCuentas = () => {
    return Habiente.findAll();
}

/**
 * Busca el habiente en el arreglo
 * 
 * @param {number} id Es identificador de la cuenta 
 * @returns El habiente si es encontrado lo devuelve si no devuelve undefined
 */
const buscarHabiente = (id) => {
    return Habiente.findOne({ where: { id: id } });
}
/**
 * Modifica los datos de la cuenta habiente especificado
 * 
 * @param {Number} id Es el identificador de la cuenta
 * @param {String} nombre Es el nombre del propietario de la cuenta
 * @returns El mensaje del resultado
 */
const modificarHabiente = async (id, nombre) => {
    //Busca la cuenta de habiente
    const habiente = await buscarHabiente(id);
    //Si encuentra el habiente modifica los datos
    if (habiente == null)
        throw { num: 400, type: `error`, msg: `Habiente no encontrado` };
    //Modifica el nombre del habiente
    habiente.nombre = nombre;
    //Salva los dato en la BD
    await habiente.save();
}


/**
 * Borra el habiente indicado
 * 
 * @param {number} id Es el identificador de la cuenta
 * @returns El mensaje del resultado 
 */
const borrarHabiente = async (id) => {
    //Busca la cuenta de habiente
    const habiente = await buscarHabiente(id);
    if (habiente == undefined)
        throw { num: 400, type: `error`, msg: `Habiente no encontrado` };
    //Si encuentra el habiente lo borra
    await habiente.destroy();
}


//Exporta los datos que se necesitan
exports.agregaCuentarHabiente = agregarCuentaHabiente;
exports.buscarHabiente = buscarHabiente;
exports.devolverCuentas = devolverCuentas;
exports.modificarHabiente = modificarHabiente;
exports.borrarHabiente = borrarHabiente;