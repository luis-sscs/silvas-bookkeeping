const { v4: uuidv4 } = require('uuid');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const invoices = await queryInterface.sequelize.query(
      `SELECT id, clientEmail, dueDate FROM invoices LIMIT 15`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const reminders = [];
    const reminderTypes = ['due_date', 'overdue', 'custom'];
    const subjects = [
      'Payment Reminder: Invoice Due Soon',
      'Invoice Overdue - Payment Required',
      'Payment Notice: Outstanding Invoice'
    ];

    for (let i = 1; i <= 20; i++) {
      const invoice = invoices[i % invoices.length];
      const reminderType = reminderTypes[Math.floor(Math.random() * reminderTypes.length)];

      reminders.push({
        id: uuidv4(),
        invoiceId: invoice.id,
        clientEmail: invoice.clientEmail,
        reminderType: reminderType,
        daysBeforeDue: reminderType === 'due_date' ? 5 : 0,
        reminderDate: randomDate(new Date(2024, 0, 1), new Date()),
        status: ['pending', 'sent', 'failed'][Math.floor(Math.random() * 3)],
        sentDate: Math.random() > 0.5 ? new Date() : null,
        subject: subjects[Math.floor(Math.random() * subjects.length)],
        message: 'Please remit payment at your earliest convenience.',
        deliveryAttempts: Math.floor(Math.random() * 3),
        lastAttemptDate: Math.random() > 0.5 ? new Date() : null,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('payment_reminders', reminders);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('payment_reminders', null, {});
  }
};
