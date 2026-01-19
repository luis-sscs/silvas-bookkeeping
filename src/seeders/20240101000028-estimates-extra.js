const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const estimates = [
      {
        id: uuidv4(),
        estimateNumber: `EST-EXTRA-${Math.floor(Math.random() * 9000) + 1000}`,
        clientName: 'Estimate Client',
        clientEmail: 'estimate.client@example.com',
        amount: 1200.00,
        status: 'sent',
        issueDate: new Date(),
        validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        description: 'Extra estimate from seeder',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('estimates', estimates);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('estimates', { clientEmail: 'estimate.client@example.com' }, {});
  }
};
