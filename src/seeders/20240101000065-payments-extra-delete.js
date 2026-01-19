module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('payments', { notes: 'Extra payment added by seeder' }, {});
  },
  down: async () => {}
};
