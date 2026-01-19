const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const currencies = [
      {
        id: uuidv4(),
        currencyCode: 'CAD',
        currencyName: 'Canadian Dollar',
        symbol: '$',
        exchangeRate: 1.35,
        baseCurrency: false,
        isActive: true,
        lastUpdated: new Date(),
        country: 'Canada',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('currencies', currencies);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('currencies', { currencyCode: 'CAD' }, {});
  }
};
