module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    paymentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    invoiceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'invoices',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: { min: 0 }
    },
    paymentMethod: {
      type: DataTypes.ENUM('credit_card', 'bank_transfer', 'check', 'cash', 'paypal'),
      defaultValue: 'bank_transfer'
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
      defaultValue: 'pending'
    },
    paymentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'payments',
    timestamps: true
  });

  return Payment;
};
