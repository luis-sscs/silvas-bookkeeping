const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const invoices = [
      {
        id: uuidv4(),
        invoiceNumber: `INV-EXTRA-${Math.floor(Math.random() * 9000) + 1000}`,
        clientName: 'Extra Client',
        clientEmail: 'extra.client@example.com',
        amount: 1500.00,
        status: 'sent',
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        description: 'Extra invoice from seeder',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('invoices', invoices);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('invoices', { clientEmail: 'extra.client@example.com' }, {});
  }
};
