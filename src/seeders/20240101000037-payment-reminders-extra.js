const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const invoice = await queryInterface.sequelize.query(
      'SELECT id, clientEmail, dueDate FROM invoices LIMIT 1',
      { type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!invoice) {
      throw new Error('No invoice found for payment-reminders-extra seeder. Please seed invoices first.');
    }

    const reminders = [
      {
        id: uuidv4(),
        invoiceId: invoice.id,
        clientEmail: invoice.clientEmail,
        reminderType: 'due_date',
        daysBeforeDue: 3,
        reminderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'pending',
        sentDate: null,
        subject: 'Upcoming invoice due soon',
        message: 'This is an extra payment reminder from seeder.',
        deliveryAttempts: 0,
        lastAttemptDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('payment_reminders', reminders);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('payment_reminders', { subject: 'Upcoming invoice due soon' }, {});
  }
};
