'use strict';

module.exports = (sequelize, DataTypes) => {
  const HabienteBancaria = sequelize.define('HabienteBancaria', {
    // Model attributes are defined here
    bancariaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "CuentaBancaria",
        key: 'id'
      }
    },
    habienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Habientes",
        key: 'id'
      }
    }
  }, {
    // Other model options go here
  });
  return HabienteBancaria;
};