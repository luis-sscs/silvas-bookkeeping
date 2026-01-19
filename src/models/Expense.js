module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vendor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    description: {
      type: DataTypes.TEXT
    },
    receiptUrl: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'reimbursed'),
      defaultValue: 'pending'
    }
  }, {
    tableName: 'expenses',
    timestamps: true
  });

  return Expense;
};
