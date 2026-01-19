module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('currencies', { currencyCode: 'BRL' }, {});
  },
  down: async () => {}
};
