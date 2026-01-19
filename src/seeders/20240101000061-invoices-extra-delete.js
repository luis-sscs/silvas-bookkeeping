module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('invoices', { clientEmail: 'extra.client@example.com' }, {});
  },
  down: async () => {}
};
