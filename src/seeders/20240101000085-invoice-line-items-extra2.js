const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const invoice = await queryInterface.sequelize.query(
      'SELECT id FROM invoices LIMIT 1',
      { type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    const product = await queryInterface.sequelize.query(
      'SELECT id FROM products LIMIT 1',
      { type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!invoice || !product) {
      throw new Error('Missing invoice or product for invoice-line-items-extra2 seeder. Seed invoices/products first.');
    }

    const lineItems = [
      {
        id: uuidv4(),
        invoiceId: invoice.id,
        productId: product.id,
        description: 'Extra service line item two',
        quantity: 1,
        unitPrice: 450.00,
        lineTotal: 450.00,
        taxId: null,
        taxAmount: 0,
        discount: 0,
        discountAmount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('invoice_line_items', lineItems);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('invoice_line_items', { description: 'Extra service line item two' }, {});
  }
};
