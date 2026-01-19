'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reports', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      reportNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: { type: Sequelize.TEXT },
      type: {
        type: Sequelize.ENUM('invoice', 'expense', 'income', 'customer', 'product'),
        allowNull: false
      },
      reportData: { type: Sequelize.JSON },
      generatedBy: { type: Sequelize.STRING },
      generatedDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      startDate: { type: Sequelize.DATE },
      endDate: { type: Sequelize.DATE },
      status: {
        type: Sequelize.ENUM('draft', 'completed', 'archived'),
        defaultValue: 'draft'
      },
      format: {
        type: Sequelize.ENUM('json', 'pdf', 'csv', 'excel'),
        defaultValue: 'json'
      },
      fileUrl: { type: Sequelize.STRING },
      isPublic: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reports');
  }
};