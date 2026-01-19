const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const invoice = await queryInterface.sequelize.query(
      'SELECT id, clientName, clientEmail FROM invoices LIMIT 1',
      { type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!invoice) {
      throw new Error('No invoice found for recurring-invoices-extra seeder. Please seed invoices first.');
    }

    const recurrences = [
      {
        id: uuidv4(),
        recurringNumber: `REC-EXTRA-${Math.floor(Math.random() * 9000) + 1000}`,
        invoiceTemplateId: invoice.id,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        amount: 2200.00,
        frequency: 'monthly',
        nextInvoiceDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        occurrences: 0,
        maxOccurrences: 12,
        isActive: true,
        description: 'Extra recurring invoice schedule',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('recurring_invoices', recurrences);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('recurring_invoices', { description: 'Extra recurring invoice schedule' }, {});
  }
};
