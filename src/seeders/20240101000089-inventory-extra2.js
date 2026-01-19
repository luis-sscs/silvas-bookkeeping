const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const product = await queryInterface.sequelize.query(
      'SELECT id FROM products LIMIT 1',
      { type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!product) {
      throw new Error('No product found for inventory-extra2 seeder. Please seed products first.');
    }

    const items = [
      {
        id: uuidv4(),
        productId: product.id,
        currentStock: 80,
        minimumStock: 15,
        maximumStock: 300,
        reorderPoint: 30,
        reorderQuantity: 60,
        warehouse: 'Main Warehouse',
        location: 'Aisle-3-Bin-5',
        lastReorderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'in_stock',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('inventory_items', items);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('inventory_items', { location: 'Aisle-3-Bin-5' }, {});
  }
};
