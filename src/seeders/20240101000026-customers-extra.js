const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const customers = [
      {
        id: uuidv4(),
        name: 'Extra Customer',
        email: 'extra.customer@example.com',
        phone: '555-7777',
        address: '789 New Ave',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'USA',
        companyName: 'Extra Co',
        taxId: `TAX-${Math.floor(Math.random() * 100000)}`,
        status: 'active',
        isActive: true,
        notes: 'Added by extra seeder',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('customers', customers);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customers', { email: 'extra.customer@example.com' }, {});
  }
};
