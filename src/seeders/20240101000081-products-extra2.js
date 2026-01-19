const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const products = [
      {
        id: uuidv4(),
        name: 'Extra Product Two',
        type: 'service',
        description: 'Additional service item from seeder',
        price: 350.00,
        sku: `EXTRA2-SKU-${Math.floor(Math.random() * 9000) + 1000}`,
        unit: 'hour',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('products', products);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', { name: 'Extra Product Two' }, {});
  }
};
