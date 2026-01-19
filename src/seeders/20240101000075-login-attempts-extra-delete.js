module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('login_attempts', { userAgent: 'SeederLoginAgent/1.0' }, {});
  },
  down: async () => {}
};
