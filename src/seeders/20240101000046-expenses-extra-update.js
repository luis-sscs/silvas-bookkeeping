module.exports = {
  up: async (queryInterface, Sequelize) => {
    const expense = await queryInterface.sequelize.query(
      'SELECT id FROM expenses WHERE vendor = :vendor LIMIT 1',
      { replacements: { vendor: 'Online Courses Inc' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!expense) {
      throw new Error('Extra expense not found for update seeder. Seed extra expenses first.');
    }

    await queryInterface.bulkUpdate(
      'expenses',
      {
        amount: 525.0,
        description: 'Training expense updated to include certification',
        status: 'approved',
        updatedAt: new Date()
      },
      { id: expense.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const expense = await queryInterface.sequelize.query(
      'SELECT id FROM expenses WHERE vendor = :vendor LIMIT 1',
      { replacements: { vendor: 'Online Courses Inc' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!expense) {
      return;
    }

    await queryInterface.bulkUpdate(
      'expenses',
      {
        amount: 450.0,
        description: 'Team training expense',
        status: 'approved',
        updatedAt: new Date()
      },
      { id: expense.id }
    );
  }
};
