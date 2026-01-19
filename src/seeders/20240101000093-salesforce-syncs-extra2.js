const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const customer = await queryInterface.sequelize.query(
      'SELECT id FROM customers LIMIT 1',
      { type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!customer) {
      throw new Error('No customer found for salesforce-syncs-extra2 seeder. Please seed customers first.');
    }

    const records = [
      {
        id: uuidv4(),
        customerId: customer.id,
        salesforceAccountId: `SF-ACC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        status: 'synced',
        lastSyncedAt: new Date(),
        errorMessage: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('salesforce_syncs', records);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('salesforce_syncs', { status: 'synced', errorMessage: null }, {});
  }
};
