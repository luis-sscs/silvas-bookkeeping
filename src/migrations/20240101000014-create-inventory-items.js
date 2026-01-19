'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventory_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onDelete: 'CASCADE'
      },
      currentStock: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      minimumStock: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      maximumStock: { type: Sequelize.DECIMAL(10, 2) },
      reorderPoint: { type: Sequelize.DECIMAL(10, 2) },
      reorderQuantity: { type: Sequelize.DECIMAL(10, 2) },
      warehouse: { type: Sequelize.STRING },
      location: { type: Sequelize.STRING },
      lastReorderDate: { type: Sequelize.DATE },
      status: {
        type: Sequelize.ENUM('in_stock', 'low_stock', 'out_of_stock', 'discontinued'),
        defaultValue: 'in_stock'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('inventory_items');
  }
};