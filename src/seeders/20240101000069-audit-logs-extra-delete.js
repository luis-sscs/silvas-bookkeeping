module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('audit_logs', { details: 'Extra audit log entry' }, {});
  },
  down: async () => {}
};
