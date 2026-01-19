const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const invoices = await queryInterface.sequelize.query(
      `SELECT id FROM invoices LIMIT 10`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const products = await queryInterface.sequelize.query(
      `SELECT id FROM products LIMIT 20`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const lineItems = [];

    for (let i = 1; i <= 30; i++) {
      const invoice = invoices[i % invoices.length];
      const product = products[i % products.length];

      const quantity = Math.floor(Math.random() * 10) + 1;
      const unitPrice = parseFloat((Math.random() * 500 + 50).toFixed(2));
      const lineTotal = (quantity * unitPrice).toFixed(2);
      const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 20) : 0;
      const discountAmount = (lineTotal * discount / 100).toFixed(2);

      lineItems.push({
        id: uuidv4(),
        invoiceId: invoice.id,
        productId: product.id,
        description: `Product line item ${i}`,
        quantity: quantity,
        unitPrice: unitPrice,
        lineTotal: (lineTotal - discountAmount),
        taxId: null,
        taxAmount: 0,
        discount: discount,
        discountAmount: discountAmount,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('invoice_line_items', lineItems);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('invoice_line_items', null, {});
  }
};
