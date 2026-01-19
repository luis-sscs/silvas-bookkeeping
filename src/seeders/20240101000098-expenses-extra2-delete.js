module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('expenses', { vendor: 'Office Gear Co' }, {});
  },
  down: async () => {}
};
