module.exports = {
  up: async (queryInterface, Sequelize) => {
    const budget = await queryInterface.sequelize.query(
      'SELECT id FROM budgets WHERE budgetName = :name LIMIT 1',
      { replacements: { name: 'Extra Marketing Budget' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!budget) {
      throw new Error('Extra budget not found for update seeder. Seed extra budgets first.');
    }

    await queryInterface.bulkUpdate(
      'budgets',
      {
        spentAmount: 1500,
        remainingAmount: 6500,
        notes: 'Updated after campaign spend',
        updatedAt: new Date()
      },
      { id: budget.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const budget = await queryInterface.sequelize.query(
      'SELECT id FROM budgets WHERE budgetName = :name LIMIT 1',
      { replacements: { name: 'Extra Marketing Budget' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!budget) {
      return;
    }

    await queryInterface.bulkUpdate(
      'budgets',
      {
        spentAmount: 1000,
        remainingAmount: 7000,
        notes: 'Additional marketing allocation',
        updatedAt: new Date()
      },
      { id: budget.id }
    );
  }
};
