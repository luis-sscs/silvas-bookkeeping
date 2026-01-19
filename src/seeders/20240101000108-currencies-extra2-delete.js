module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('currencies', { currencyCode: 'CAD' }, {});
  },
  down: async () => {}
};
