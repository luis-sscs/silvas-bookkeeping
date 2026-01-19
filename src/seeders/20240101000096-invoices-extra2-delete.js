module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Find invoices to delete
    const invoices = await queryInterface.sequelize.query(
      "SELECT id FROM invoices WHERE clientEmail = 'extra.client.two@example.com'",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (invoices.length > 0) {
      const invoiceIds = invoices.map(i => i.id);

      // Delete dependent records first
      await queryInterface.bulkDelete('payment_reminders', { invoiceId: invoiceIds });
      await queryInterface.bulkDelete('invoice_line_items', { invoiceId: invoiceIds });
      await queryInterface.bulkDelete('payments', { invoiceId: invoiceIds });

      // Now delete the invoices
      await queryInterface.bulkDelete('invoices', { id: invoiceIds });
    }
  },
  down: async () => {}
};
