const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const auditLogs = [];

    const actions = ['create', 'update', 'delete', 'login'];
    const entityTypes = ['Invoice', 'Payment', 'Expense', 'Customer', 'Product'];
    const users = await queryInterface.sequelize.query(
      `SELECT id, username FROM users LIMIT 3`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    for (let i = 1; i <= 50; i++) {
      const user = users[i % users.length];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const entityType = entityTypes[Math.floor(Math.random() * entityTypes.length)];

      auditLogs.push({
        id: uuidv4(),
        userId: user.id,
        username: user.username,
        action: action,
        entityType: entityType,
        entityId: uuidv4(),
        oldValues: action === 'update' ? JSON.stringify({ field: 'oldValue' }) : null,
        newValues: action !== 'delete' ? JSON.stringify({ field: 'newValue' }) : null,
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        details: `${action} operation on ${entityType}`,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      });
    }

    await queryInterface.bulkInsert('audit_logs', auditLogs);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('audit_logs', null, {});
  }
};
