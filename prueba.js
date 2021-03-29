const models = require('./models');
const Habiente = models.Habiente;
const Bancaria = models.CuentaBancaria;
const HabienteBancaria = models.HabienteBancaria;

async function demoAsociacionMuchosAMuchos() {
    await HabienteBancaria.destroy({where: {}}).then(() => {
        console.log("Se sincronizaron las tablas");
    }).catch(() => {
        console.log("Error en las tablas");
    });
    await Habiente.destroy({where: {}}).then(() => {
        console.log("Se sincronizaron las tablas");
    }).catch((e) => {
        console.log(e);
        console.log("Error en las tablas");
    });
    await Bancaria.destroy({where: {}}).then(() => {
        console.log("Se sincronizaron las tablas");
    }).catch((e) => {
        console.log(e);
        console.log("Error en las tablas");
    });
    //await HabienteBancaria.sync({ force: true })
    await Habiente.create({
        nombre: "Axel"
    });
    await Bancaria.create({
        saldo: 2000
    })
    let habiente = await Habiente.findOne({
        where: {
            nombre: "Axel"
        }
    });

    console.log(`Datos del habiente: `, habiente.id, habiente.nombre);

    let cuentasBancarias = await Bancaria.findAll();
    // Asociar todos los cursos al estudiante
    await habiente.addCuentaBancaria(cuentasBancarias, { through: { id: "1" } });
    //Desplegar los datos de los cursos asociados al estudiante
    let cuentas = await habiente.getCuentaBancaria();
    console.log(`Cuentas del habiente: `, habiente.id);
    cuentas.forEach((cuenta) => console.log(cuenta.id, cuenta.saldo));
    // Al hacer la asociacion de estudiante con curso se puede acceder
    // el dato del alumno através del curso
    let cuenta = await Bancaria.findOne({ where: { id: "1" } });
    console.log(cuenta);
    let habientes = await cuenta.getHabiente();
    console.log("Cuentas de Banco:");
    await habientes.forEach((habiente) => console.log(habiente.id, habiente.nombre));
    models.sequelize.close();
}

demoAsociacionMuchosAMuchos().catch(() => console.log("Error"));