module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('audit_logs', { details: 'Second extra audit log entry' }, {});
  },
  down: async () => {}
};
