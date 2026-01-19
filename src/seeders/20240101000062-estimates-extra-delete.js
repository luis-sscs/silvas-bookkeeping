module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('estimates', { clientEmail: 'estimate.client@example.com' }, {});
  },
  down: async () => {}
};
