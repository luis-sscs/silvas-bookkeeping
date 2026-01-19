'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('audit_logs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      username: { type: Sequelize.STRING },
      action: {
        type: Sequelize.ENUM('create', 'update', 'delete', 'login', 'logout', 'export'),
        allowNull: false
      },
      entityType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      entityId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      oldValues: { type: Sequelize.JSON },
      newValues: { type: Sequelize.JSON },
      ipAddress: { type: Sequelize.STRING },
      userAgent: { type: Sequelize.TEXT },
      details: { type: Sequelize.TEXT },
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('audit_logs');
  }
};