module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('recurring_invoices', { description: 'Extra recurring invoice schedule' }, {});
  },
  down: async () => {}
};
