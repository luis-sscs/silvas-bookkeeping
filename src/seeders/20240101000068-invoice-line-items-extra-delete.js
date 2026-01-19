module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('invoice_line_items', { description: 'Extra service line item' }, {});
  },
  down: async () => {}
};
