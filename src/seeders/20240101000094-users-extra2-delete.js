module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('users', { email: 'extra_user_two@silvas.com' }, {});
  },
  down: async () => {}
};
