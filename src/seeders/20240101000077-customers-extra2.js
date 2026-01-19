const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const customers = [
      {
        id: uuidv4(),
        name: 'Extra Customer Two',
        email: 'extra.customer.two@example.com',
        phone: '555-2222',
        address: '22 Second St',
        city: 'Denver',
        state: 'CO',
        zipCode: '80202',
        country: 'USA',
        companyName: 'Extra Two LLC',
        taxId: `TAX-${Math.floor(Math.random() * 100000)}`,
        status: 'active',
        isActive: true,
        notes: 'Second extra customer seeder',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('customers', customers);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('customers', { email: 'extra.customer.two@example.com' }, {});
  }
};
