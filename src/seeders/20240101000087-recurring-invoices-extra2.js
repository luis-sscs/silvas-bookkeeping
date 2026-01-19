const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const invoice = await queryInterface.sequelize.query(
      'SELECT id, clientName, clientEmail FROM invoices LIMIT 1',
      { type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!invoice) {
      throw new Error('No invoice found for recurring-invoices-extra2 seeder. Please seed invoices first.');
    }

    const recurrences = [
      {
        id: uuidv4(),
        recurringNumber: `REC-EXTRA2-${Math.floor(Math.random() * 9000) + 1000}`,
        invoiceTemplateId: invoice.id,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        amount: 1250.00,
        frequency: 'quarterly',
        nextInvoiceDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        startDate: new Date(),
        endDate: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000),
        occurrences: 0,
        maxOccurrences: 8,
        isActive: true,
        description: 'Second extra recurring invoice schedule',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('recurring_invoices', recurrences);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('recurring_invoices', { description: 'Second extra recurring invoice schedule' }, {});
  }
};
