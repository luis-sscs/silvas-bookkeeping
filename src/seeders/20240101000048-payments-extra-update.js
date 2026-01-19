module.exports = {
  up: async (queryInterface, Sequelize) => {
    const payment = await queryInterface.sequelize.query(
      'SELECT id FROM payments WHERE notes = :notes LIMIT 1',
      { replacements: { notes: 'Extra payment added by seeder' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!payment) {
      throw new Error('Extra payment not found for update seeder. Seed extra payments first.');
    }

    await queryInterface.bulkUpdate(
      'payments',
      {
        amount: 800.0,
        paymentMethod: 'credit_card',
        notes: 'Updated extra payment after reconciliation',
        updatedAt: new Date()
      },
      { id: payment.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const payment = await queryInterface.sequelize.query(
      'SELECT id FROM payments WHERE notes = :notes LIMIT 1',
      { replacements: { notes: 'Updated extra payment after reconciliation' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!payment) {
      return;
    }

    await queryInterface.bulkUpdate(
      'payments',
      {
        amount: 750.0,
        paymentMethod: 'bank_transfer',
        notes: 'Extra payment added by seeder',
        updatedAt: new Date()
      },
      { id: payment.id }
    );
  }
};
