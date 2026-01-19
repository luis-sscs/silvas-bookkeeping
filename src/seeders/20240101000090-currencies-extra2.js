const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const currencies = [
      {
        id: uuidv4(),
        currencyCode: 'NZD',
        currencyName: 'New Zealand Dollar',
        symbol: 'NZ$',
        exchangeRate: 1.63,
        baseCurrency: false,
        isActive: true,
        lastUpdated: new Date(),
        country: 'New Zealand',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('currencies', currencies);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('currencies', { currencyCode: 'NZD' }, {});
  }
};
