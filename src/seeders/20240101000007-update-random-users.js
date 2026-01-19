module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const userUpdates = [
        { username: 'admin', changes: { email: 'admin.updated@silvas.com' } },
        { username: 'testuser', changes: { email: 'test.updated@silvas.com' } }
      ];

      for (const update of userUpdates) {
        if (Math.random() > 0.5) {
          await queryInterface.sequelize.query(
            `UPDATE users SET email = :email, updatedAt = NOW() WHERE username = :username`,
            {
              replacements: { email: update.changes.email, username: update.username }
            }
          );
        }
      }

      console.log('Random user updates completed successfully!');
    } catch (error) {
      console.error('Error during random user updates:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    console.log('User update seeder cannot be undone');
  }
};
