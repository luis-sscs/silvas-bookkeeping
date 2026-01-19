module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reports', { name: 'Extra Revenue Report' }, {});
  },
  down: async () => {}
};
