'use strict';
/**
 * Exportación del modelo de bancaria
 * 
 * @param {Object} sequelize Es la clase sequelize
 * @param {Object} DataTypes Se usa para indicar el tipo de dato
 * @returns El modelo del Bancaria
 */
module.exports = (sequelize, DataTypes) => {
  const CuentaBancaria = sequelize.define('CuentaBancaria', {
    // Model attributes are defined here
    saldo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    // Other model options go here
  });
  //Relacion de muchos a muchos
  CuentaBancaria.associate = (models) => {
    CuentaBancaria.belongsToMany(models.Habiente, {
      as: "Habiente",
      through: 'habientebancaria',
      foreignKey: "bancariaId"
    });
  };
  return CuentaBancaria;
};