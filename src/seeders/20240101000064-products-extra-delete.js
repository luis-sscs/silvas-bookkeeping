module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', { name: 'Extra Product' }, {});
  },
  down: async () => {}
};
