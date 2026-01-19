module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lineItem = await queryInterface.sequelize.query(
      'SELECT id FROM invoice_line_items WHERE description = :description LIMIT 1',
      { replacements: { description: 'Extra service line item' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!lineItem) {
      throw new Error('Extra invoice line item not found for update seeder. Seed extra line items first.');
    }

    await queryInterface.bulkUpdate(
      'invoice_line_items',
      {
        quantity: 3,
        unitPrice: 320.0,
        lineTotal: 960.0,
        updatedAt: new Date()
      },
      { id: lineItem.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const lineItem = await queryInterface.sequelize.query(
      'SELECT id FROM invoice_line_items WHERE description = :description LIMIT 1',
      { replacements: { description: 'Extra service line item' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!lineItem) {
      return;
    }

    await queryInterface.bulkUpdate(
      'invoice_line_items',
      {
        quantity: 2,
        unitPrice: 300.0,
        lineTotal: 600.0,
        updatedAt: new Date()
      },
      { id: lineItem.id }
    );
  }
};
