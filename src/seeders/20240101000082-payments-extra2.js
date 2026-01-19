const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const invoice = await queryInterface.sequelize.query(
      'SELECT id FROM invoices LIMIT 1',
      { type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!invoice) {
      throw new Error('No invoice found for payments-extra2 seeder. Seed invoices first.');
    }

    const payments = [
      {
        id: uuidv4(),
        paymentNumber: `PAY-EXTRA2-${Math.floor(Math.random() * 9000) + 1000}`,
        invoiceId: invoice.id,
        amount: 900.00,
        paymentMethod: 'credit_card',
        status: 'completed',
        paymentDate: new Date(),
        transactionId: `TXN-EXTRA2-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        notes: 'Second extra payment added by seeder',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('payments', payments);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('payments', { notes: 'Second extra payment added by seeder' }, {});
  }
};
