const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const budgets = [
      {
        id: uuidv4(),
        budgetName: 'Extra Marketing Budget Two',
        category: 'Marketing',
        year: 2025,
        month: 1,
        budgetAmount: 9000,
        spentAmount: 500,
        remainingAmount: 8500,
        status: 'on_track',
        notes: 'Second marketing allocation',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('budgets', budgets);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('budgets', { budgetName: 'Extra Marketing Budget Two' }, {});
  }
};
