module.exports = (sequelize, DataTypes) => {
  const InventoryItem = sequelize.define('InventoryItem', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    currentStock: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 }
    },
    minimumStock: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 }
    },
    maximumStock: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: { min: 0 }
    },
    reorderPoint: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: { min: 0 }
    },
    reorderQuantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: { min: 0 }
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastReorderDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('in_stock', 'low_stock', 'out_of_stock', 'discontinued'),
      defaultValue: 'in_stock'
    }
  }, {
    tableName: 'inventory_items',
    timestamps: true
  });

  return InventoryItem;
};
