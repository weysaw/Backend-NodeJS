'use strict';

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
  CuentaBancaria.associate = (models) => {
    CuentaBancaria.belongsToMany(models.Habiente, {
      as: "Habientes",
      through: 'habientebancaria',
      foreignKey: "habienteId"
    });
  };
  return CuentaBancaria;
};