const { v4: uuidv4 } = require('uuid');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomAmount(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const invoices = await queryInterface.sequelize.query(
      `SELECT id FROM invoices LIMIT 5`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const recurringInvoices = [];
    const frequencies = ['daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'yearly'];
    const clients = [
      { name: 'Acme Corp', email: 'billing@acme.com' },
      { name: 'Tech Solutions', email: 'accounts@techsolutions.com' },
      { name: 'Global Enterprises', email: 'finance@global.com' }
    ];

    for (let i = 1; i <= 10; i++) {
      const client = clients[i % clients.length];
      const frequency = frequencies[Math.floor(Math.random() * frequencies.length)];
      const startDate = randomDate(new Date(2024, 0, 1), new Date());

      const nextInvoiceDate = new Date(startDate);
      switch(frequency) {
        case 'monthly':
          nextInvoiceDate.setMonth(nextInvoiceDate.getMonth() + 1);
          break;
        case 'quarterly':
          nextInvoiceDate.setMonth(nextInvoiceDate.getMonth() + 3);
          break;
        case 'yearly':
          nextInvoiceDate.setFullYear(nextInvoiceDate.getFullYear() + 1);
          break;
      }

      recurringInvoices.push({
        id: uuidv4(),
        recurringNumber: `REC-${2024}-${String(i).padStart(4, '0')}`,
        invoiceTemplateId: invoices[i % invoices.length].id,
        clientName: client.name,
        clientEmail: client.email,
        amount: randomAmount(500, 10000),
        frequency: frequency,
        nextInvoiceDate: nextInvoiceDate,
        startDate: startDate,
        endDate: new Date(2025, 11, 31),
        occurrences: 0,
        maxOccurrences: frequency === 'yearly' ? 3 : 12,
        isActive: true,
        description: `Recurring invoice for ${client.name}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('recurring_invoices', recurringInvoices);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('recurring_invoices', null, {});
  }
};
