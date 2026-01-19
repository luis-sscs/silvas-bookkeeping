module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customers', { email: 'extra.customer@example.com' }, {});
  },
  down: async () => {}
};
