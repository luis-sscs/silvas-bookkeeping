'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('taxes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      taxName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      taxCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      rate: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      region: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: { type: Sequelize.STRING },
      taxType: {
        type: Sequelize.ENUM('income', 'sales', 'vat', 'gst', 'custom'),
        defaultValue: 'sales'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      effectiveDate: { type: Sequelize.DATE },
      expiryDate: { type: Sequelize.DATE },
      description: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('taxes');
  }
};