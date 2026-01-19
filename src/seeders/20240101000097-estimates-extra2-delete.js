module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('estimates', { clientEmail: 'estimate.client.two@example.com' }, {});
  },
  down: async () => {}
};
