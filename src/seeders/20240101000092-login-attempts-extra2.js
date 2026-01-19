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
        ipAddress: '198.51.100.45',
        userAgent: 'SeederLoginAgent/2.0',
        status: 'failed',
        failureReason: 'Account locked',
        attemptDate: new Date(),
        isBlocked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('login_attempts', attempts);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('login_attempts', { userAgent: 'SeederLoginAgent/2.0' }, {});
  }
};
