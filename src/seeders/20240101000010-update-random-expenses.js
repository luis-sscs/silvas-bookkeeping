function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const expenseStatuses = ['pending', 'approved', 'rejected', 'reimbursed'];
      const expenses = await queryInterface.sequelize.query(
        `SELECT id FROM expenses LIMIT 5`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      for (const expense of expenses) {
        if (Math.random() > 0.4) {
          await queryInterface.sequelize.query(
            `UPDATE expenses SET status = :status, updatedAt = NOW() WHERE id = :id`,
            {
              replacements: {
                status: getRandomItem(expenseStatuses),
                id: expense.id
              }
            }
          );
        }
      }

      console.log('Random expense updates completed successfully!');
    } catch (error) {
      console.error('Error during random expense updates:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    console.log('Expense update seeder cannot be undone');
  }
};
