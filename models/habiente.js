'use strict';

/**
 * Exportación del modelo de habiente 
 * 
 * @param {Object} sequelize Es la clase sequelize
 * @param {Object} DataTypes Se usa para indicar el tipo de dato
 * @returns El modelo del Habiente
 */
module.exports = (sequelize, DataTypes) => {
  const Habiente = sequelize.define('Habiente', {
    // Definición de atributos
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
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