'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone: { type: Sequelize.STRING },
      address: { type: Sequelize.TEXT },
      city: { type: Sequelize.STRING },
      state: { type: Sequelize.STRING },
      zipCode: { type: Sequelize.STRING },
      country: { type: Sequelize.STRING },
      companyName: { type: Sequelize.STRING },
      taxId: {
        type: Sequelize.STRING,
        unique: true
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'suspended'),
        defaultValue: 'active'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      notes: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customers');
  }
};