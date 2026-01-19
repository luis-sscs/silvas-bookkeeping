module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    reportNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('invoice', 'expense', 'income', 'customer', 'product'),
      allowNull: false
    },
    reportData: {
      type: DataTypes.JSON,
      allowNull: true
    },
    generatedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    generatedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft', 'completed', 'archived'),
      defaultValue: 'draft'
    },
    format: {
      type: DataTypes.ENUM('json', 'pdf', 'csv', 'excel'),
      defaultValue: 'json'
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'reports',
    timestamps: true
  });

  return Report;
};
