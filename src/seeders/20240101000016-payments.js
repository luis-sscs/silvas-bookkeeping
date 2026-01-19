const { v4: uuidv4 } = require('uuid');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomAmount(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const invoices = await queryInterface.sequelize.query(
      `SELECT id FROM invoices LIMIT 10`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const payments = [];
    const paymentMethods = ['credit_card', 'bank_transfer', 'check', 'cash', 'paypal'];
    const statuses = ['pending', 'completed', 'failed', 'refunded'];

    for (let i = 1; i <= 20; i++) {
      const invoice = invoices[i % invoices.length];
      
      payments.push({
        id: uuidv4(),
        paymentNumber: `PAY-${2024}-${String(i).padStart(4, '0')}`,
        invoiceId: invoice.id,
        amount: randomAmount(100, 5000),
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        paymentDate: randomDate(new Date(2024, 0, 1), new Date()),
        transactionId: `TXN-${i}${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        notes: `Payment for invoice`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('payments', payments);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('payments', null, {});
  }
};
