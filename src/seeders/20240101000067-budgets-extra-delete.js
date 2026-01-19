module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('budgets', { budgetName: 'Extra Marketing Budget' }, {});
  },
  down: async () => {}
};
