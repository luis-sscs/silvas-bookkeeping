module.exports = {
  up: async (queryInterface, Sequelize) => {
    const invoice = await queryInterface.sequelize.query(
      'SELECT id FROM invoices WHERE clientEmail = :email LIMIT 1',
      { replacements: { email: 'extra.client@example.com' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!invoice) {
      throw new Error('Extra invoice not found for update seeder. Seed extra invoices first.');
    }

    await queryInterface.bulkUpdate(
      'invoices',
      {
        status: 'paid',
        amount: 1750.0,
        description: 'Updated extra invoice after payment',
        updatedAt: new Date()
      },
      { id: invoice.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const invoice = await queryInterface.sequelize.query(
      'SELECT id FROM invoices WHERE clientEmail = :email LIMIT 1',
      { replacements: { email: 'extra.client@example.com' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!invoice) {
      return;
    }

    await queryInterface.bulkUpdate(
      'invoices',
      {
        status: 'sent',
        amount: 1500.0,
        description: 'Extra invoice from seeder',
        updatedAt: new Date()
      },
      { id: invoice.id }
    );
  }
};
