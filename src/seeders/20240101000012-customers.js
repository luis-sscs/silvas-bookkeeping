const { v4: uuidv4 } = require('uuid');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const customers = [
      {
        id: uuidv4(),
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '555-0101',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        companyName: 'Smith Enterprises',
        taxId: 'TAX-12345',
        status: 'active',
        isActive: true,
        notes: 'Preferred customer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '555-0102',
        address: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'USA',
        companyName: 'Doe Solutions',
        taxId: 'TAX-67890',
        status: 'active',
        isActive: true,
        notes: 'New customer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        phone: '555-0103',
        address: '789 Pine Rd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA',
        companyName: 'Johnson Corp',
        taxId: 'TAX-11111',
        status: 'active',
        isActive: true,
        notes: 'High value customer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Maria Garcia',
        email: 'maria.garcia@example.com',
        phone: '555-0104',
        address: '321 Elm St',
        city: 'Houston',
        state: 'TX',
        zipCode: '77001',
        country: 'USA',
        companyName: 'Garcia LLC',
        taxId: 'TAX-22222',
        status: 'inactive',
        isActive: false,
        notes: 'Inactive account',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'David Lee',
        email: 'david.lee@example.com',
        phone: '555-0105',
        address: '654 Maple Dr',
        city: 'Phoenix',
        state: 'AZ',
        zipCode: '85001',
        country: 'USA',
        companyName: 'Lee Industries',
        taxId: 'TAX-33333',
        status: 'active',
        isActive: true,
        notes: 'Long-term customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('customers', customers, { ignoreDuplicates: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customers', null, {});
  }
};
