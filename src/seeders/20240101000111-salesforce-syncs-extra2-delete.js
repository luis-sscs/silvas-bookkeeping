module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('salesforce_syncs', { status: 'synced', errorMessage: null }, {});
  },
  down: async () => {}
};
