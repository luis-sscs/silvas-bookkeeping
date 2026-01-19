module.exports = (sequelize, DataTypes) => {
  const SalesforceSync = sequelize.define('SalesforceSync', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    salesforceAccountId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'synced', 'failed'),
      defaultValue: 'pending'
    },
    lastSyncedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'salesforce_syncs',
    timestamps: true
  });

  SalesforceSync.associate = (models) => {
    SalesforceSync.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });
  };

  return SalesforceSync;
};
