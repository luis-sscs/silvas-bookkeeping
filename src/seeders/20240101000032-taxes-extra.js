const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const taxes = [
      {
        id: uuidv4(),
        taxName: 'Extra Regional Tax',
        taxCode: `EXTRA-TAX-${Math.floor(Math.random() * 9000) + 1000}`,
        rate: 4.50,
        region: 'Extra Region',
        country: 'USA',
        taxType: 'sales',
        isActive: true,
        effectiveDate: new Date(),
        description: 'Additional tax rate from extra seeder',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('taxes', taxes);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('taxes', { taxName: 'Extra Regional Tax' }, {});
  }
};
