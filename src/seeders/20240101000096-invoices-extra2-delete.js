module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('invoices', { clientEmail: 'extra.client.two@example.com' }, {});
  },
  down: async () => {}
};
