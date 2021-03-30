'use strict';
/**
 * Exportación del modelo de habiente bancaria
 * 
 * @param {Object} sequelize Es la clase sequelize
 * @param {Object} DataTypes Se usa para indicar el tipo de dato
 * @returns El modelo del HabienteBancaria
 */
module.exports = (sequelize, DataTypes) => {
  const HabienteBancaria = sequelize.define('HabienteBancaria', {
    // Definiciones de atributos
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
  });
  return HabienteBancaria;
};