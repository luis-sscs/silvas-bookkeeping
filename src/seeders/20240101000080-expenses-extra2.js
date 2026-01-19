const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const expenses = [
      {
        id: uuidv4(),
        category: 'Equipment',
        vendor: 'Office Gear Co',
        amount: 980.00,
        date: new Date(),
        description: 'New ergonomic chairs',
        receiptUrl: null,
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('expenses', expenses);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('expenses', { vendor: 'Office Gear Co' }, {});
  }
};
