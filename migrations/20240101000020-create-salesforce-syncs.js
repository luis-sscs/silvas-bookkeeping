module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('salesforce_syncs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      customerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      salesforceAccountId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('pending', 'synced', 'failed'),
        defaultValue: 'pending'
      },
      lastSyncedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      errorMessage: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.addIndex('salesforce_syncs', ['customerId'], {
      unique: true,
      name: 'salesforce_syncs_customer_unique'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('salesforce_syncs');
  }
};
