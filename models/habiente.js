'use strict';

module.exports = (sequelize, DataTypes) => {
  const Habiente = sequelize.define('Habiente', {
    // Model attributes are defined here
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
  });
  Habiente.associate = (models) => {
    Habiente.belongsToMany(models.CuentaBancaria, {
      as: "CuentaBancarias",
      through: 'habientebancaria',
      foreignKey: "bancariaId"
    });
  };
  return Habiente;
};