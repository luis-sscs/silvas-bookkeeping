module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('products', { name: 'Extra Product Two' }, {});
  },
  down: async () => {}
};
