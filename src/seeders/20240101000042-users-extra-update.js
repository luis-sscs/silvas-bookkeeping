module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE email = :email LIMIT 1',
      { replacements: { email: 'extra_user@silvas.com' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!user) {
      throw new Error('extra_user not found for update seeder. Seed extra users first.');
    }

    await queryInterface.bulkUpdate(
      'users',
      {
        username: 'extra_user_updated',
        email: 'extra_user_updated@silvas.com',
        updatedAt: new Date()
      },
      { id: user.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const user = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE email = :email LIMIT 1',
      { replacements: { email: 'extra_user_updated@silvas.com' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!user) {
      return;
    }

    await queryInterface.bulkUpdate(
      'users',
      {
        username: 'extra_user',
        email: 'extra_user@silvas.com',
        updatedAt: new Date()
      },
      { id: user.id }
    );
  }
};
