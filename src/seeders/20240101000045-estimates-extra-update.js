module.exports = {
  up: async (queryInterface, Sequelize) => {
    const estimate = await queryInterface.sequelize.query(
      'SELECT id FROM estimates WHERE clientEmail = :email LIMIT 1',
      { replacements: { email: 'estimate.client@example.com' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!estimate) {
      throw new Error('Extra estimate not found for update seeder. Seed extra estimates first.');
    }

    await queryInterface.bulkUpdate(
      'estimates',
      {
        status: 'accepted',
        amount: 1350.0,
        description: 'Updated estimate after negotiation',
        updatedAt: new Date()
      },
      { id: estimate.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const estimate = await queryInterface.sequelize.query(
      'SELECT id FROM estimates WHERE clientEmail = :email LIMIT 1',
      { replacements: { email: 'estimate.client@example.com' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!estimate) {
      return;
    }

    await queryInterface.bulkUpdate(
      'estimates',
      {
        status: 'sent',
        amount: 1200.0,
        description: 'Extra estimate from seeder',
        updatedAt: new Date()
      },
      { id: estimate.id }
    );
  }
};
