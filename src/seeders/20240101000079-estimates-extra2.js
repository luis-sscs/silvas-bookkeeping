const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const estimates = [
      {
        id: uuidv4(),
        estimateNumber: `EST-EXTRA2-${Math.floor(Math.random() * 9000) + 1000}`,
        clientName: 'Estimate Client Two',
        clientEmail: 'estimate.client.two@example.com',
        amount: 1800.00,
        status: 'sent',
        issueDate: new Date(),
        validUntil: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        description: 'Second extra estimate from seeder',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('estimates', estimates);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('estimates', { clientEmail: 'estimate.client.two@example.com' }, {});
  }
};
