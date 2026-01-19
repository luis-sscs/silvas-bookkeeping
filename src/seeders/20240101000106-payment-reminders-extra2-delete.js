module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('payment_reminders', { subject: 'Invoice overdue reminder' }, {});
  },
  down: async () => {}
};
