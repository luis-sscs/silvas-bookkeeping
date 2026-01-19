module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define('Currency', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    currencyCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true
    },
    currencyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    symbol: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    exchangeRate: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false,
      defaultValue: 1,
      validate: { min: 0 }
    },
    baseCurrency: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'currencies',
    timestamps: true
  });

  return Currency;
};
