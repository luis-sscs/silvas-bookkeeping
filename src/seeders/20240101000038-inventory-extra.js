const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const product = await queryInterface.sequelize.query(
      'SELECT id FROM products LIMIT 1',
      { type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!product) {
      throw new Error('No product found for inventory-extra seeder. Please seed products first.');
    }

    const items = [
      {
        id: uuidv4(),
        productId: product.id,
        currentStock: 150,
        minimumStock: 20,
        maximumStock: 500,
        reorderPoint: 40,
        reorderQuantity: 100,
        warehouse: 'Main Warehouse',
        location: 'Aisle-2-Bin-10',
        lastReorderDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        status: 'in_stock',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('inventory_items', items);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('inventory_items', { location: 'Aisle-2-Bin-10' }, {});
  }
};
