module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('invoice_line_items', { description: 'Extra service line item two' }, {});
  },
  down: async () => {}
};
