'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      paymentNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      invoiceId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'invoices', key: 'id' }
      },
      amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      paymentMethod: {
        type: Sequelize.ENUM('credit_card', 'bank_transfer', 'check', 'cash', 'paypal'),
        defaultValue: 'bank_transfer'
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed', 'refunded'),
        defaultValue: 'pending'
      },
      paymentDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      transactionId: { type: Sequelize.STRING },
      notes: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payments');
  }
};