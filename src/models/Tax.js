module.exports = (sequelize, DataTypes) => {
  const Tax = sequelize.define('Tax', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    taxName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taxCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    rate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate: { min: 0, max: 100 }
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    taxType: {
      type: DataTypes.ENUM('income', 'sales', 'vat', 'gst', 'custom'),
      defaultValue: 'sales'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    effectiveDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'taxes',
    timestamps: true
  });

  return Tax;
};
