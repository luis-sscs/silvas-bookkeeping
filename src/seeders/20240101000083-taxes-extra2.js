const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const taxes = [
      {
        id: uuidv4(),
        taxName: 'Extra Regional Tax Two',
        taxCode: `EXTRA2-TAX-${Math.floor(Math.random() * 9000) + 1000}`,
        rate: 5.25,
        region: 'Extra Region 2',
        country: 'USA',
        taxType: 'sales',
        isActive: true,
        effectiveDate: new Date(),
        description: 'Second additional tax rate from seeder',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('taxes', taxes);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('taxes', { taxName: 'Extra Regional Tax Two' }, {});
  }
};
