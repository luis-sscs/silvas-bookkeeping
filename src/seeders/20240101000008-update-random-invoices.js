function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const invoiceStatuses = ['draft', 'sent', 'paid', 'overdue', 'cancelled'];
      const invoices = await queryInterface.sequelize.query(
        `SELECT id FROM invoices LIMIT 5`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      for (const invoice of invoices) {
        if (Math.random() > 0.4) {
          await queryInterface.sequelize.query(
            `UPDATE invoices SET status = :status, updatedAt = NOW() WHERE id = :id`,
            {
              replacements: {
                status: getRandomItem(invoiceStatuses),
                id: invoice.id
              }
            }
          );
        }
      }

      console.log('Random invoice updates completed successfully!');
    } catch (error) {
      console.error('Error during random invoice updates:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    console.log('Invoice update seeder cannot be undone');
  }
};
