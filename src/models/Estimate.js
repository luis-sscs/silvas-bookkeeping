module.exports = (sequelize, DataTypes) => {
  const Estimate = sequelize.define('Estimate', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    estimateNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.ENUM('draft', 'sent', 'accepted', 'rejected', 'expired'),
      defaultValue: 'draft'
    },
    issueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    validUntil: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'estimates',
    timestamps: true
  });

  return Estimate;
};
