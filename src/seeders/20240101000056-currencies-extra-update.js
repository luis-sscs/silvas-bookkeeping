module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currency = await queryInterface.sequelize.query(
      'SELECT id FROM currencies WHERE currencyCode = :code LIMIT 1',
      { replacements: { code: 'BRL' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!currency) {
      throw new Error('Extra currency not found for update seeder. Seed extra currencies first.');
    }

    await queryInterface.bulkUpdate(
      'currencies',
      {
        exchangeRate: 5.25,
        isActive: true,
        updatedAt: new Date()
      },
      { id: currency.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const currency = await queryInterface.sequelize.query(
      'SELECT id FROM currencies WHERE currencyCode = :code LIMIT 1',
      { replacements: { code: 'BRL' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!currency) {
      return;
    }

    await queryInterface.bulkUpdate(
      'currencies',
      {
        exchangeRate: 5.1,
        isActive: true,
        updatedAt: new Date()
      },
      { id: currency.id }
    );
  }
};
