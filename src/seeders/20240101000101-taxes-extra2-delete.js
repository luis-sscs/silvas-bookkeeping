module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('taxes', { taxName: 'Extra Regional Tax Two' }, {});
  },
  down: async () => {}
};
