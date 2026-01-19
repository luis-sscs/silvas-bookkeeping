module.exports = (sequelize, DataTypes) => {
  const PaymentReminder = sequelize.define('PaymentReminder', {
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
    clientEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reminderType: {
      type: DataTypes.ENUM('due_date', 'overdue', 'custom'),
      defaultValue: 'due_date'
    },
    daysBeforeDue: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    reminderDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'sent', 'failed', 'cancelled'),
      defaultValue: 'pending'
    },
    sentDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deliveryAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    lastAttemptDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'payment_reminders',
    timestamps: true
  });

  return PaymentReminder;
};
