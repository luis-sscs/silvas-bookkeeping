const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        id: uuidv4(),
        username: 'extra_user',
        email: 'extra_user@silvas.com',
        password: '$2a$10$8vZ3g4YZp5YXXzp5YXXzp5YXXzp5YXXzp5YXXzp5YXXzp5YXXz',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('users', users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', { email: 'extra_user@silvas.com' }, {});
  }
};
