module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('taxes', { taxName: 'Extra Regional Tax' }, {});
  },
  down: async () => {}
};