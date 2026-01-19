function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const estimateStatuses = ['draft', 'sent', 'accepted', 'rejected', 'expired'];
      const estimates = await queryInterface.sequelize.query(
        `SELECT id FROM estimates LIMIT 5`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      for (const estimate of estimates) {
        if (Math.random() > 0.4) {
          await queryInterface.sequelize.query(
            `UPDATE estimates SET status = :status, updatedAt = NOW() WHERE id = :id`,
            {
              replacements: {
                status: getRandomItem(estimateStatuses),
                id: estimate.id
              }
            }
          );
        }
      }

      console.log('Random estimate updates completed successfully!');
    } catch (error) {
      console.error('Error during random estimate updates:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    console.log('Estimate update seeder cannot be undone');
  }
};
