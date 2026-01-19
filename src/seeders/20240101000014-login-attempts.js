const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get existing users to associate with login attempts
    const users = await queryInterface.sequelize.query(
      `SELECT id, email, username FROM users LIMIT 2`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const loginAttempts = [];
    const ipAddresses = ['192.168.1.100', '192.168.1.101', '10.0.0.50', '10.0.0.51', '203.0.113.25'];
    const statuses = ['success', 'failed', 'blocked'];
    const failureReasons = ['Invalid password', 'Account locked', 'Too many attempts', 'IP blocked', null];
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      'PostmanRuntime/7.32.0'
    ];

    // Create successful login attempts
    if (users.length > 0) {
      for (let i = 0; i < 10; i++) {
        const user = users[i % users.length];
        loginAttempts.push({
          id: uuidv4(),
          userId: user.id,
          email: user.email,
          username: user.username,
          ipAddress: ipAddresses[i % ipAddresses.length],
          userAgent: userAgents[i % userAgents.length],
          status: 'success',
          failureReason: null,
          attemptDate: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
          isBlocked: false,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    // Create failed login attempts
    for (let i = 0; i < 15; i++) {
      loginAttempts.push({
        id: uuidv4(),
        userId: users.length > 0 ? users[i % users.length].id : null,
        email: users.length > 0 ? users[i % users.length].email : `unknown${i}@example.com`,
        username: users.length > 0 ? users[i % users.length].username : `unknown${i}`,
        ipAddress: ipAddresses[i % ipAddresses.length],
        userAgent: userAgents[i % userAgents.length],
        status: i < 5 ? 'failed' : i < 10 ? 'failed' : 'blocked',
        failureReason: i < 5 ? 'Invalid password' : i < 10 ? 'Too many attempts' : 'Account locked',
        attemptDate: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        isBlocked: i >= 10,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('login_attempts', loginAttempts);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('login_attempts', null, {});
  }
};
