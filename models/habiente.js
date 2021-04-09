'use strict';

/**
 * Exportación del modelo de habiente 
 * 
 * @param {Object} sequelize Es la clase sequelize
 * @param {Object} DataTypes Se usa para indicar el tipo de dato
 * @returns El modelo del Habiente
 */
const cuentaHabiente = (sequelize, DataTypes) => {
  const Habiente = sequelize.define('CuentaHabiente', {
    // Definición de atributos
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });
  //Se hace la relación de muchos a muchos
  Habiente.associate = (models) => {
    Habiente.belongsToMany(models.CuentaBancaria, {
      as: "CuentaBancaria",
      through: 'habientebancaria',
      foreignKey: "habienteId"
    });
  };

  return Habiente;
};


module.exports = cuentaHabiente;
