const { v4: uuidv4 } = require('uuid');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomAmount(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = ['Office Supplies', 'Travel', 'Software', 'Marketing', 'Utilities'];
    const vendors = ['Amazon', 'Office Depot', 'Delta Airlines', 'Adobe', 'Google Ads', 'Electric Company'];
    const statuses = ['pending', 'approved', 'rejected', 'reimbursed'];

    const expenses = [];
    for (let i = 1; i <= 15; i++) {
      expenses.push({
        id: uuidv4(),
        category: categories[Math.floor(Math.random() * categories.length)],
        vendor: vendors[Math.floor(Math.random() * vendors.length)],
        amount: randomAmount(50, 2000),
        date: randomDate(new Date(2024, 0, 1), new Date()),
        description: `Business expense for operations`,
        receiptUrl: Math.random() > 0.5 ? `https://example.com/receipts/${i}.pdf` : null,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('expenses', expenses);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('expenses', null, {});
  }
};
