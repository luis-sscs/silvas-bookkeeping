module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('inventory_items', { location: 'Aisle-3-Bin-5' }, {});
  },
  down: async () => {}
};
