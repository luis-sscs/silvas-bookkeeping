function randomAmount(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const products = await queryInterface.sequelize.query(
        `SELECT id FROM products LIMIT 5`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      for (const product of products) {
        if (Math.random() > 0.3) {
          const newPrice = randomAmount(10, 5000);
          const isActive = Math.random() > 0.5;
          await queryInterface.sequelize.query(
            `UPDATE products SET price = :price, isActive = :isActive, updatedAt = NOW() WHERE id = :id`,
            {
              replacements: {
                price: newPrice,
                isActive: isActive,
                id: product.id
              }
            }
          );
        }
      }

      console.log('Random product updates completed successfully!');
    } catch (error) {
      console.error('Error during random product updates:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    console.log('Product update seeder cannot be undone');
  }
};
