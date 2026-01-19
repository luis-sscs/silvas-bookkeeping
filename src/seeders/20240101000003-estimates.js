const { v4: uuidv4 } = require('uuid');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomAmount(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const statuses = ['draft', 'sent', 'accepted', 'rejected', 'expired'];
    const clients = [
      { name: 'Acme Corporation', email: 'billing@acme.com' },
      { name: 'Tech Solutions Inc', email: 'accounts@techsolutions.com' },
      { name: 'Global Enterprises', email: 'finance@globalent.com' },
      { name: 'Startup Hub', email: 'payments@startuphub.com' },
      { name: 'Retail Masters', email: 'ap@retailmasters.com' }
    ];

    const estimates = [];
    for (let i = 1; i <= 10; i++) {
      const client = clients[Math.floor(Math.random() * clients.length)];
      const issueDate = randomDate(new Date(2024, 0, 1), new Date());
      const validUntil = new Date(issueDate);
      validUntil.setDate(validUntil.getDate() + 30);

      estimates.push({
        id: uuidv4(),
        estimateNumber: `EST-${2024}-${String(i).padStart(4, '0')}`,
        clientName: client.name,
        clientEmail: client.email,
        amount: randomAmount(1000, 15000),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        issueDate: issueDate,
        validUntil: validUntil,
        description: `Project estimate for ${client.name}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('estimates', estimates);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('estimates', null, {});
  }
};
