const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currencies = [
      {
        id: uuidv4(),
        currencyCode: 'BRL',
        currencyName: 'Brazilian Real',
        symbol: 'R$',
        exchangeRate: 5.10,
        baseCurrency: false,
        isActive: true,
        lastUpdated: new Date(),
        country: 'Brazil',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('currencies', currencies);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('currencies', { currencyCode: 'BRL' }, {});
  }
};
