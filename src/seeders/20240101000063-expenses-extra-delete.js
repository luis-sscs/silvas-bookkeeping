module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('expenses', { vendor: 'Online Courses Inc' }, {});
  },
  down: async () => {}
};
