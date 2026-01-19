'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('budgets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      budgetName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      month: {
        type: Sequelize.INTEGER
      },
      budgetAmount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      spentAmount: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0
      },
      remainingAmount: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM('on_track', 'over_budget', 'completed'),
        defaultValue: 'on_track'
      },
      notes: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('budgets');
  }
};