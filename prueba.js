const models = require('./models');
const Habiente = models.Habiente;
const Bancaria = models.CuentaBancaria;

async function demoAsociacionMuchosAMuchos() {
    await Habiente.sync({ force: true }).then(() => {
        console.log("Se sincronizaron las tablas");
    }).catch(() => {
        console.log("Error en las tablas");
    });
    await Bancaria.sync({ force: true }).then(() => {
        console.log("Se sincronizaron las tablas");
    }).catch(() => {
        console.log("Error en las tablas");
    });

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
    await habiente.addCuentaBancarias(cuentasBancarias, { through: { id: "1" } });
    //Desplegar los datos de los cursos asociados al estudiante
    let cuentas = await habiente.getCuentaBancarias();
    console.log(`Cuentas del habiente: `, habiente.id);
    cuentas.forEach((cuenta) => console.log(cuenta.id, cuenta.saldo));
    // Al hacer la asociacion de estudiante con curso se puede acceder
    // el dato del alumno através del curso
    let curso = await Bancaria.findOne({ where: { id: "1" } });
    let habientes = await curso.getHabientes();
    console.log("Cuentas de Banco:");
    habientes.forEach((habiente) => console.log(habiente.id, habiente.nombre));
    models.sequelize.close();
}

demoAsociacionMuchosAMuchos();