const { v4: uuidv4 } = require('uuid');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomAmount(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const statuses = ['draft', 'sent', 'paid', 'overdue', 'cancelled'];
    const clients = [
      { name: 'Acme Corporation', email: 'billing@acme.com' },
      { name: 'Tech Solutions Inc', email: 'accounts@techsolutions.com' },
      { name: 'Global Enterprises', email: 'finance@globalent.com' },
      { name: 'Startup Hub', email: 'payments@startuphub.com' },
      { name: 'Retail Masters', email: 'ap@retailmasters.com' }
    ];

    const invoices = [];
    for (let i = 1; i <= 10; i++) {
      const client = clients[Math.floor(Math.random() * clients.length)];
      const issueDate = randomDate(new Date(2024, 0, 1), new Date());
      const dueDate = new Date(issueDate);
      dueDate.setDate(dueDate.getDate() + 30);

      invoices.push({
        id: uuidv4(),
        invoiceNumber: `INV-${2024}-${String(i).padStart(4, '0')}`,
        clientName: client.name,
        clientEmail: client.email,
        amount: randomAmount(500, 10000),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        issueDate: issueDate,
        dueDate: dueDate,
        description: `Services rendered for ${client.name}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('invoices', invoices);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('invoices', null, {});
  }
};
