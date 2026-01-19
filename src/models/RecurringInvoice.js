module.exports = (sequelize, DataTypes) => {
  const RecurringInvoice = sequelize.define('RecurringInvoice', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    recurringNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    invoiceTemplateId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'invoices',
        key: 'id'
      }
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: { min: 0 }
    },
    frequency: {
      type: DataTypes.ENUM('daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'yearly'),
      defaultValue: 'monthly'
    },
    nextInvoiceDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    occurrences: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    maxOccurrences: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'recurring_invoices',
    timestamps: true
  });

  return RecurringInvoice;
};
