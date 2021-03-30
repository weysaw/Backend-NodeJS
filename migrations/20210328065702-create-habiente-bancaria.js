'use strict';
//Se utiliza para crear la tabla en la BD
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HabienteBancaria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bancariaId: {
        type: Sequelize.INTEGER,
        references: {
          model: "CuentaBancaria",
          key: 'id'
        }
      },
      habienteId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Habientes",
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HabienteBancaria');
  }
};