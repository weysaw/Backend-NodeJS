'use strict';

module.exports = (sequelize, DataTypes) => {
  const HabienteBancaria = sequelize.define('HabienteBancaria', {
    // Model attributes are defined here
    habienteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bancariaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    // Other model options go here
  });
  return HabienteBancaria;
};