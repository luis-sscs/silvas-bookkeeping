'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('currencies', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      currencyCode: {
        type: Sequelize.STRING(3),
        allowNull: false,
        unique: true
      },
      currencyName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      symbol: { type: Sequelize.STRING(5) },
      exchangeRate: {
        type: Sequelize.DECIMAL(10, 6),
        allowNull: false,
        defaultValue: 1
      },
      baseCurrency: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      lastUpdated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      country: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('currencies');
  }
};