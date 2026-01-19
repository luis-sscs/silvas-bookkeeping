module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tax = await queryInterface.sequelize.query(
      'SELECT id FROM taxes WHERE taxName = :name LIMIT 1',
      { replacements: { name: 'Extra Regional Tax' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!tax) {
      throw new Error('Extra tax not found for update seeder. Seed extra taxes first.');
    }

    await queryInterface.bulkUpdate(
      'taxes',
      {
        rate: 4.75,
        description: 'Adjusted extra tax rate',
        updatedAt: new Date()
      },
      { id: tax.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const tax = await queryInterface.sequelize.query(
      'SELECT id FROM taxes WHERE taxName = :name LIMIT 1',
      { replacements: { name: 'Extra Regional Tax' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!tax) {
      return;
    }

    await queryInterface.bulkUpdate(
      'taxes',
      {
        rate: 4.5,
        description: 'Additional tax rate from extra seeder',
        updatedAt: new Date()
      },
      { id: tax.id }
    );
  }
};
