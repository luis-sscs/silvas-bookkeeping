module.exports = {
  up: async (queryInterface, Sequelize) => {
    const item = await queryInterface.sequelize.query(
      'SELECT id FROM inventory_items WHERE location = :location LIMIT 1',
      { replacements: { location: 'Aisle-2-Bin-10' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!item) {
      throw new Error('Extra inventory item not found for update seeder. Seed extra inventory items first.');
    }

    await queryInterface.bulkUpdate(
      'inventory_items',
      {
        currentStock: 120,
        reorderPoint: 50,
        status: 'in_stock',
        updatedAt: new Date()
      },
      { id: item.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const item = await queryInterface.sequelize.query(
      'SELECT id FROM inventory_items WHERE location = :location LIMIT 1',
      { replacements: { location: 'Aisle-2-Bin-10' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!item) {
      return;
    }

    await queryInterface.bulkUpdate(
      'inventory_items',
      {
        currentStock: 150,
        reorderPoint: 40,
        status: 'in_stock',
        updatedAt: new Date()
      },
      { id: item.id }
    );
  }
};
