module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('payments', { notes: 'Second extra payment added by seeder' }, {});
  },
  down: async () => {}
};
