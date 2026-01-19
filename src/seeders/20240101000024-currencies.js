const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currencies = [
      {
        id: uuidv4(),
        currencyCode: 'USD',
        currencyName: 'United States Dollar',
        symbol: '$',
        exchangeRate: 1.00,
        baseCurrency: true,
        isActive: true,
        lastUpdated: new Date(),
        country: 'United States',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        currencyCode: 'EUR',
        currencyName: 'Euro',
        symbol: '€',
        exchangeRate: 0.92,
        baseCurrency: false,
        isActive: true,
        lastUpdated: new Date(),
        country: 'European Union',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        currencyCode: 'GBP',
        currencyName: 'British Pound',
        symbol: '£',
        exchangeRate: 0.79,
        baseCurrency: false,
        isActive: true,
        lastUpdated: new Date(),
        country: 'United Kingdom',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        currencyCode: 'CAD',
        currencyName: 'Canadian Dollar',
        symbol: 'C$',
        exchangeRate: 1.36,
        baseCurrency: false,
        isActive: true,
        lastUpdated: new Date(),
        country: 'Canada',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        currencyCode: 'JPY',
        currencyName: 'Japanese Yen',
        symbol: '¥',
        exchangeRate: 149.50,
        baseCurrency: false,
        isActive: true,
        lastUpdated: new Date(),
        country: 'Japan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        currencyCode: 'AUD',
        currencyName: 'Australian Dollar',
        symbol: 'A$',
        exchangeRate: 1.52,
        baseCurrency: false,
        isActive: true,
        lastUpdated: new Date(),
        country: 'Australia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        currencyCode: 'CHF',
        currencyName: 'Swiss Franc',
        symbol: 'Fr',
        exchangeRate: 0.88,
        baseCurrency: false,
        isActive: true,
        lastUpdated: new Date(),
        country: 'Switzerland',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        currencyCode: 'MXN',
        currencyName: 'Mexican Peso',
        symbol: '$',
        exchangeRate: 17.05,
        baseCurrency: false,
        isActive: true,
        lastUpdated: new Date(),
        country: 'Mexico',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('currencies', currencies, { ignoreDuplicates: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('currencies', null, {});
  }
};
