'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('product', 'service'),
        allowNull: false
      },
      description: { type: Sequelize.TEXT },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      sku: {
        type: Sequelize.STRING,
        unique: true
      },
      unit: {
        type: Sequelize.STRING,
        defaultValue: 'unit'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};