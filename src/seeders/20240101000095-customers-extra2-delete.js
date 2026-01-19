module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('customers', { email: 'extra.customer.two@example.com' }, {});
  },
  down: async () => {}
};
