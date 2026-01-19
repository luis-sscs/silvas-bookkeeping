const { v4: uuidv4 } = require('uuid');

function randomAmount(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const budgets = [
      {
        id: uuidv4(),
        budgetName: '2024 Q1 Travel Budget',
        category: 'Travel',
        year: 2024,
        month: 1,
        budgetAmount: 5000,
        spentAmount: 3200,
        remainingAmount: 1800,
        status: 'on_track',
        notes: 'Q1 travel budget allocation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        budgetName: '2024 Q1 Marketing Budget',
        category: 'Marketing',
        year: 2024,
        month: 1,
        budgetAmount: 10000,
        spentAmount: 8500,
        remainingAmount: 1500,
        status: 'on_track',
        notes: 'Q1 marketing budget allocation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        budgetName: '2024 Q1 Operations Budget',
        category: 'Operations',
        year: 2024,
        month: 1,
        budgetAmount: 15000,
        spentAmount: 16500,
        remainingAmount: -1500,
        status: 'over_budget',
        notes: 'Q1 operations exceeded budget',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        budgetName: '2024 Annual Software Budget',
        category: 'Software',
        year: 2024,
        budgetAmount: 25000,
        spentAmount: 12000,
        remainingAmount: 13000,
        status: 'on_track',
        notes: 'Annual software licenses and subscriptions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        budgetName: '2024 Annual Utilities Budget',
        category: 'Utilities',
        year: 2024,
        budgetAmount: 20000,
        spentAmount: 18000,
        remainingAmount: 2000,
        status: 'on_track',
        notes: 'Annual utilities and office expenses',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('budgets', budgets);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('budgets', null, {});
  }
};
