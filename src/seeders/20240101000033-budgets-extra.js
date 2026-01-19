const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const budgets = [
      {
        id: uuidv4(),
        budgetName: 'Extra Marketing Budget',
        category: 'Marketing',
        year: 2024,
        month: 6,
        budgetAmount: 8000,
        spentAmount: 1000,
        remainingAmount: 7000,
        status: 'on_track',
        notes: 'Additional marketing allocation',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('budgets', budgets);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('budgets', { budgetName: 'Extra Marketing Budget' }, {});
  }
};
