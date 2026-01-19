'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('invoices', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      invoiceNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('draft', 'sent', 'paid', 'overdue', 'cancelled'),
        defaultValue: 'draft'
      },
      issueDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      description: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('invoices');
  }
};