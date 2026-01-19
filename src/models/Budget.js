module.exports = (sequelize, DataTypes) => {
  const Budget = sequelize.define('Budget', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    budgetName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 1, max: 12 }
    },
    budgetAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: { min: 0 }
    },
    spentAmount: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
      validate: { min: 0 }
    },
    remainingAmount: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('on_track', 'over_budget', 'completed'),
      defaultValue: 'on_track'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'budgets',
    timestamps: true
  });

  return Budget;
};
