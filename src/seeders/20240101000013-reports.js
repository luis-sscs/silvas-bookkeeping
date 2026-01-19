const { v4: uuidv4 } = require('uuid');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomAmount(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const reports = [
      {
        id: uuidv4(),
        reportNumber: `RPT-${2024}-${String(1).padStart(4, '0')}`,
        name: 'Monthly Invoice Report',
        description: 'Summary of all invoices for January 2024',
        type: 'invoice',
        reportData: { totalInvoices: 45, totalAmount: randomAmount(50000, 100000) },
        generatedBy: 'admin',
        generatedDate: randomDate(new Date(2024, 0, 1), new Date()),
        startDate: new Date(2024, 0, 1),
        endDate: new Date(2024, 0, 31),
        status: 'completed',
        format: 'json',
        fileUrl: 'https://example.com/reports/invoices-2024-01.pdf',
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        reportNumber: `RPT-${2024}-${String(2).padStart(4, '0')}`,
        name: 'Expense Analysis Report',
        description: 'Detailed breakdown of business expenses',
        type: 'expense',
        reportData: { totalExpenses: 15000, byCategory: { travel: 5000, supplies: 4000, utilities: 6000 } },
        generatedBy: 'admin',
        generatedDate: randomDate(new Date(2024, 0, 1), new Date()),
        startDate: new Date(2024, 0, 1),
        endDate: new Date(2024, 0, 31),
        status: 'completed',
        format: 'json',
        fileUrl: 'https://example.com/reports/expenses-2024-01.pdf',
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        reportNumber: `RPT-${2024}-${String(3).padStart(4, '0')}`,
        name: 'Customer Growth Report',
        description: 'Analysis of customer base growth and activity',
        type: 'customer',
        reportData: { newCustomers: 12, activeCustomers: 85, retention: 0.92 },
        generatedBy: 'admin',
        generatedDate: randomDate(new Date(2024, 0, 1), new Date()),
        startDate: new Date(2024, 0, 1),
        endDate: new Date(2024, 0, 31),
        status: 'completed',
        format: 'json',
        fileUrl: 'https://example.com/reports/customers-2024-01.pdf',
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        reportNumber: `RPT-${2024}-${String(4).padStart(4, '0')}`,
        name: 'Income Report',
        description: 'Total revenue and income sources',
        type: 'income',
        reportData: { totalRevenue: 150000, sources: { invoices: 120000, services: 30000 } },
        generatedBy: 'admin',
        generatedDate: randomDate(new Date(2024, 0, 1), new Date()),
        startDate: new Date(2024, 0, 1),
        endDate: new Date(2024, 0, 31),
        status: 'completed',
        format: 'json',
        fileUrl: 'https://example.com/reports/income-2024-01.pdf',
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        reportNumber: `RPT-${2024}-${String(5).padStart(4, '0')}`,
        name: 'Product Inventory Report',
        description: 'Inventory and product performance metrics',
        type: 'product',
        reportData: { totalProducts: 50, activeProducts: 45, outOfStock: 5 },
        generatedBy: 'admin',
        generatedDate: randomDate(new Date(2024, 0, 1), new Date()),
        startDate: new Date(2024, 0, 1),
        endDate: new Date(2024, 0, 31),
        status: 'draft',
        format: 'json',
        fileUrl: null,
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('reports', reports);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reports', null, {});
  }
};
