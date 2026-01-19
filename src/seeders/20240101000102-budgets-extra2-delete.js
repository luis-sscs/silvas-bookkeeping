module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('budgets', { budgetName: 'Extra Marketing Budget Two' }, {});
  },
  down: async () => {}
};
