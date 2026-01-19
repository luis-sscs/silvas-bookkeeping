'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('invoice_line_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      invoiceId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'invoices', key: 'id' },
        onDelete: 'CASCADE'
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'products', key: 'id' },
        onDelete: 'SET NULL'
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      quantity: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      unitPrice: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      lineTotal: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      taxId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'taxes', key: 'id' }
      },
      taxAmount: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0
      },
      discount: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0
      },
      discountAmount: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('invoice_line_items');
  }
};