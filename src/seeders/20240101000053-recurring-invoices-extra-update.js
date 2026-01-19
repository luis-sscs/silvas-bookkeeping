module.exports = {
  up: async (queryInterface, Sequelize) => {
    const recurring = await queryInterface.sequelize.query(
      'SELECT id FROM recurring_invoices WHERE description = :description LIMIT 1',
      { replacements: { description: 'Extra recurring invoice schedule' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!recurring) {
      throw new Error('Extra recurring invoice not found for update seeder. Seed extra recurring invoices first.');
    }

    await queryInterface.bulkUpdate(
      'recurring_invoices',
      {
        amount: 2300.0,
        maxOccurrences: 18,
        description: 'Updated recurring invoice schedule',
        updatedAt: new Date()
      },
      { id: recurring.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const recurring = await queryInterface.sequelize.query(
      'SELECT id FROM recurring_invoices WHERE description = :description LIMIT 1',
      { replacements: { description: 'Updated recurring invoice schedule' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!recurring) {
      return;
    }

    await queryInterface.bulkUpdate(
      'recurring_invoices',
      {
        amount: 2200.0,
        maxOccurrences: 12,
        description: 'Extra recurring invoice schedule',
        updatedAt: new Date()
      },
      { id: recurring.id }
    );
  }
};
