module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('login_attempts', { userAgent: 'SeederLoginAgent/2.0' }, {});
  },
  down: async () => {}
};
