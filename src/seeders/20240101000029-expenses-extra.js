const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const expenses = [
      {
        id: uuidv4(),
        category: 'Training',
        vendor: 'Online Courses Inc',
        amount: 450.00,
        date: new Date(),
        description: 'Team training expense',
        receiptUrl: null,
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('expenses', expenses);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('expenses', { vendor: 'Online Courses Inc' }, {});
  }
};
