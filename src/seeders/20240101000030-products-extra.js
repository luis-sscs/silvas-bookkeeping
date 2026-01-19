const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [
      {
        id: uuidv4(),
        name: 'Extra Product',
        type: 'product',
        description: 'Additional product added by seeder',
        price: 199.99,
        sku: `EXTRA-SKU-${Math.floor(Math.random() * 9000) + 1000}`,
        unit: 'unit',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('products', products);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', { name: 'Extra Product' }, {});
  }
};
