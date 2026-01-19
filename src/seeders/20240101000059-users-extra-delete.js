module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', { email: 'extra_user@silvas.com' }, {});
  },
  down: async () => {}
};
