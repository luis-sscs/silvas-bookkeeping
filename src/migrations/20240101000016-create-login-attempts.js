'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('login_attempts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' }
      },
      email: { type: Sequelize.STRING },
      username: { type: Sequelize.STRING },
      ipAddress: { type: Sequelize.STRING },
      userAgent: { type: Sequelize.TEXT },
      status: {
        type: Sequelize.ENUM('success', 'failed', 'blocked'),
        defaultValue: 'failed'
      },
      failureReason: { type: Sequelize.STRING },
      attemptDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      isBlocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('login_attempts');
  }
};