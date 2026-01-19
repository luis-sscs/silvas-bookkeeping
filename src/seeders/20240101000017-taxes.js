const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const taxes = [
      {
        id: uuidv4(),
        taxName: 'Sales Tax - California',
        taxCode: 'CA-SALES',
        rate: 7.25,
        region: 'California',
        country: 'USA',
        taxType: 'sales',
        isActive: true,
        effectiveDate: new Date(2024, 0, 1),
        description: 'Standard California sales tax',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        taxName: 'VAT - UK',
        taxCode: 'UK-VAT',
        rate: 20.00,
        region: 'England',
        country: 'UK',
        taxType: 'vat',
        isActive: true,
        effectiveDate: new Date(2024, 0, 1),
        description: 'Standard UK VAT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        taxName: 'GST - Canada',
        taxCode: 'CA-GST',
        rate: 5.00,
        region: 'Ontario',
        country: 'Canada',
        taxType: 'gst',
        isActive: true,
        effectiveDate: new Date(2024, 0, 1),
        description: 'Canadian Goods and Services Tax',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        taxName: 'Income Tax',
        taxCode: 'INCOME-TAX',
        rate: 15.00,
        region: 'Federal',
        country: 'USA',
        taxType: 'income',
        isActive: true,
        effectiveDate: new Date(2024, 0, 1),
        description: 'Federal income tax rate',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        taxName: 'Sales Tax - Texas',
        taxCode: 'TX-SALES',
        rate: 6.25,
        region: 'Texas',
        country: 'USA',
        taxType: 'sales',
        isActive: true,
        effectiveDate: new Date(2024, 0, 1),
        description: 'Standard Texas sales tax',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('taxes', taxes);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('taxes', null, {});
  }
};
