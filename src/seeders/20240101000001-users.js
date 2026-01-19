const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        id: uuidv4(),
        username: 'admin',
        email: 'admin@silvas.com',
        password: '$2a$10$8vZ3g4YZp5YXXzp5YXXzp5YXXzp5YXXzp5YXXzp5YXXzp5YXXz', // hashed: admin123
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'testuser',
        email: 'test@silvas.com',
        password: '$2a$10$8vZ3g4YZp5YXXzp5YXXzp5YXXzp5YXXzp5YXXzp5YXXzp5YXXz', // hashed: test123
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('users', users, { ignoreDuplicates: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
