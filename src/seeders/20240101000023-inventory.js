const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await queryInterface.sequelize.query(
      `SELECT id FROM products LIMIT 20`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const inventoryItems = [];
    const warehouses = ['Main Warehouse', 'Secondary Warehouse', 'Distribution Center'];
    const statuses = ['in_stock', 'low_stock', 'out_of_stock'];

    for (const product of products) {
      const currentStock = Math.floor(Math.random() * 1000);
      const minimumStock = Math.floor(Math.random() * 100);
      const status = currentStock === 0 ? 'out_of_stock' : currentStock <= minimumStock ? 'low_stock' : 'in_stock';

      inventoryItems.push({
        id: uuidv4(),
        productId: product.id,
        currentStock: currentStock,
        minimumStock: minimumStock,
        maximumStock: Math.floor(Math.random() * 1000) + 500,
        reorderPoint: minimumStock * 2,
        reorderQuantity: Math.floor(Math.random() * 500) + 100,
        warehouse: warehouses[Math.floor(Math.random() * warehouses.length)],
        location: `Aisle-${Math.floor(Math.random() * 10)}-Bin-${Math.floor(Math.random() * 50)}`,
        lastReorderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
        status: status,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('inventory_items', inventoryItems);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('inventory_items', null, {});
  }
};
