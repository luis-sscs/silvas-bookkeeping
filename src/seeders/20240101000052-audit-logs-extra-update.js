module.exports = {
  up: async (queryInterface, Sequelize) => {
    const auditLog = await queryInterface.sequelize.query(
      'SELECT id FROM audit_logs WHERE details = :details LIMIT 1',
      { replacements: { details: 'Extra audit log entry' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!auditLog) {
      throw new Error('Extra audit log not found for update seeder. Seed extra audit logs first.');
    }

    await queryInterface.bulkUpdate(
      'audit_logs',
      {
        action: 'update',
        newValues: { status: 'updated' },
        details: 'Updated audit log entry',
        updatedAt: new Date()
      },
      { id: auditLog.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const auditLog = await queryInterface.sequelize.query(
      'SELECT id FROM audit_logs WHERE details = :details LIMIT 1',
      { replacements: { details: 'Updated audit log entry' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!auditLog) {
      return;
    }

    await queryInterface.bulkUpdate(
      'audit_logs',
      {
        action: 'create',
        newValues: { status: 'created' },
        details: 'Extra audit log entry',
        updatedAt: new Date()
      },
      { id: auditLog.id }
    );
  }
};
