module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('payment_reminders', { subject: 'Upcoming invoice due soon' }, {});
  },
  down: async () => {}
};
