const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const invoices = [
      {
        id: uuidv4(),
        invoiceNumber: `INV-EXTRA2-${Math.floor(Math.random() * 9000) + 1000}`,
        clientName: 'Extra Client Two',
        clientEmail: 'extra.client.two@example.com',
        amount: 2100.00,
        status: 'sent',
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        description: 'Second extra invoice from seeder',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('invoices', invoices);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('invoices', { clientEmail: 'extra.client.two@example.com' }, {});
  }
};
