module.exports = {
  up: async (queryInterface, Sequelize) => {
    const customer = await queryInterface.sequelize.query(
      'SELECT id FROM customers WHERE email = :email LIMIT 1',
      { replacements: { email: 'extra.customer@example.com' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!customer) {
      throw new Error('Extra customer not found for update seeder. Seed extra customers first.');
    }

    await queryInterface.bulkUpdate(
      'customers',
      {
        phone: '555-9999',
        city: 'Portland',
        notes: 'Updated extra customer via update seeder',
        updatedAt: new Date()
      },
      { id: customer.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const customer = await queryInterface.sequelize.query(
      'SELECT id FROM customers WHERE email = :email LIMIT 1',
      { replacements: { email: 'extra.customer@example.com' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!customer) {
      return;
    }

    await queryInterface.bulkUpdate(
      'customers',
      {
        phone: '555-7777',
        city: 'Seattle',
        notes: 'Added by extra seeder',
        updatedAt: new Date()
      },
      { id: customer.id }
    );
  }
};
