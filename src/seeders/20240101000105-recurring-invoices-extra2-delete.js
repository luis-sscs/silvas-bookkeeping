module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('recurring_invoices', { description: 'Second extra recurring invoice schedule' }, {});
  },
  down: async () => {}
};
