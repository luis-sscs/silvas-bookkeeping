const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await queryInterface.sequelize.query(
      'SELECT id, email, username FROM users LIMIT 1',
      { type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    const attempts = [
      {
        id: uuidv4(),
        userId: user ? user.id : null,
        email: user ? user.email : 'unknown@example.com',
        username: user ? user.username : 'unknown_user',
        ipAddress: '198.51.100.25',
        userAgent: 'SeederLoginAgent/1.0',
        status: 'failed',
        failureReason: 'Invalid password',
        attemptDate: new Date(),
        isBlocked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('login_attempts', attempts);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('login_attempts', { userAgent: 'SeederLoginAgent/1.0' }, {});
  }
};
