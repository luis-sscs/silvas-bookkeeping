const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await queryInterface.sequelize.query(
      'SELECT id, username FROM users LIMIT 1',
      { type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!user) {
      throw new Error('No user found for audit-logs-extra2 seeder. Please seed users first.');
    }

    const logs = [
      {
        id: uuidv4(),
        userId: user.id,
        username: user.username,
        action: 'sync',
        entityType: 'Customer',
        entityId: uuidv4(),
        oldValues: null,
        newValues: JSON.stringify({ synced: true }),
        ipAddress: '203.0.113.101',
        userAgent: 'SeederAgent/2.0',
        details: 'Second extra audit log entry',
        timestamp: new Date()
      }
    ];

    await queryInterface.bulkInsert('audit_logs', logs);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('audit_logs', { details: 'Second extra audit log entry' }, {});
  }
};
