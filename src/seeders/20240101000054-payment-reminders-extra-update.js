module.exports = {
  up: async (queryInterface, Sequelize) => {
    const reminder = await queryInterface.sequelize.query(
      'SELECT id FROM payment_reminders WHERE subject = :subject LIMIT 1',
      { replacements: { subject: 'Upcoming invoice due soon' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!reminder) {
      throw new Error('Extra payment reminder not found for update seeder. Seed extra payment reminders first.');
    }

    await queryInterface.bulkUpdate(
      'payment_reminders',
      {
        status: 'sent',
        sentDate: new Date(),
        deliveryAttempts: 1,
        lastAttemptDate: new Date(),
        message: 'Updated reminder content from update seeder',
        updatedAt: new Date()
      },
      { id: reminder.id }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const reminder = await queryInterface.sequelize.query(
      'SELECT id FROM payment_reminders WHERE subject = :subject LIMIT 1',
      { replacements: { subject: 'Upcoming invoice due soon' }, type: Sequelize.QueryTypes.SELECT }
    ).then(rows => rows[0]);

    if (!reminder) {
      return;
    }

    await queryInterface.bulkUpdate(
      'payment_reminders',
      {
        status: 'pending',
        sentDate: null,
        deliveryAttempts: 0,
        lastAttemptDate: null,
        message: 'This is an extra payment reminder from seeder.',
        updatedAt: new Date()
      },
      { id: reminder.id }
    );
  }
};
