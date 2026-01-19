'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payment_reminders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      invoiceId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'invoices', key: 'id' }
      },
      clientEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reminderType: {
        type: Sequelize.ENUM('due_date', 'overdue', 'custom'),
        defaultValue: 'due_date'
      },
      daysBeforeDue: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      reminderDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'sent', 'failed', 'cancelled'),
        defaultValue: 'pending'
      },
      sentDate: { type: Sequelize.DATE },
      subject: {
        type: Sequelize.STRING,
        allowNull: false
      },
      message: { type: Sequelize.TEXT },
      deliveryAttempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      lastAttemptDate: { type: Sequelize.DATE },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payment_reminders');
  }
};