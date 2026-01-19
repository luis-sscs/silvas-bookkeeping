module.exports = {
  up: async (queryInterface, Sequelize) => {
    const product = await queryInterface.sequelize.query(
      'SELECT id FROM products WHERE name = :name LIMIT 1',
      { replacements: { name: 'Extra Product' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!product) {
      throw new Error('Extra product not found for update seeder. Seed extra products first.');
    }

    await queryInterface.bulkUpdate(
      'products',
      {
        price: 219.99,
        description: 'Updated product pricing from update seeder',
        updatedAt: new Date()
      },
      { id: product.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const product = await queryInterface.sequelize.query(
      'SELECT id FROM products WHERE name = :name LIMIT 1',
      { replacements: { name: 'Extra Product' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!product) {
      return;
    }

    await queryInterface.bulkUpdate(
      'products',
      {
        price: 199.99,
        description: 'Additional product added by seeder',
        updatedAt: new Date()
      },
      { id: product.id }
    );
  }
};
