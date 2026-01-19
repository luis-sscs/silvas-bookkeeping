module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('inventory_items', { location: 'Aisle-2-Bin-10' }, {});
  },
  down: async () => {}
};
