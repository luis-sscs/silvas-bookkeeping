module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('reports', { name: 'Extra Profit Report Two' }, {});
  },
  down: async () => {}
};
