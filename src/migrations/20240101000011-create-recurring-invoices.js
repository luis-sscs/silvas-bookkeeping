'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recurring_invoices', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      recurringNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      invoiceTemplateId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'invoices', key: 'id' }
      },
      clientName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      clientEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      frequency: {
        type: Sequelize.ENUM('daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'yearly'),
        defaultValue: 'monthly'
      },
      nextInvoiceDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endDate: { type: Sequelize.DATE },
      occurrences: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      maxOccurrences: { type: Sequelize.INTEGER },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      description: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('recurring_invoices');
  }
};