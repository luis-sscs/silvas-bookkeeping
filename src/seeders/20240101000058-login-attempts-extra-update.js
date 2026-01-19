module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attempt = await queryInterface.sequelize.query(
      'SELECT id FROM login_attempts WHERE userAgent = :agent LIMIT 1',
      { replacements: { agent: 'SeederLoginAgent/1.0' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!attempt) {
      throw new Error('Extra login attempt not found for update seeder. Seed extra login attempts first.');
    }

    await queryInterface.bulkUpdate(
      'login_attempts',
      {
        status: 'failed',
        failureReason: 'Blocked after retries',
        isBlocked: true,
        updatedAt: new Date()
      },
      { id: attempt.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const attempt = await queryInterface.sequelize.query(
      'SELECT id FROM login_attempts WHERE userAgent = :agent LIMIT 1',
      { replacements: { agent: 'SeederLoginAgent/1.0' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!attempt) {
      return;
    }

    await queryInterface.bulkUpdate(
      'login_attempts',
      {
        status: 'failed',
        failureReason: 'Invalid password',
        isBlocked: false,
        updatedAt: new Date()
      },
      { id: attempt.id }
    );
  }
};
