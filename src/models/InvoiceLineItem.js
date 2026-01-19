module.exports = (sequelize, DataTypes) => {
  const InvoiceLineItem = sequelize.define('InvoiceLineItem', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    invoiceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'invoices',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 }
    },
    unitPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: { min: 0 }
    },
    lineTotal: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: { min: 0 }
    },
    taxId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'taxes',
        key: 'id'
      }
    },
    taxAmount: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
      validate: { min: 0 }
    },
    discount: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      validate: { min: 0, max: 100 }
    },
    discountAmount: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
      validate: { min: 0 }
    }
  }, {
    tableName: 'invoice_line_items',
    timestamps: true
  });

  return InvoiceLineItem;
};
