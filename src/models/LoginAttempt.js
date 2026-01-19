module.exports = (sequelize, DataTypes) => {
  const LoginAttempt = sequelize.define('LoginAttempt', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('success', 'failed', 'blocked'),
      defaultValue: 'failed'
    },
    failureReason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attemptDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'login_attempts',
    timestamps: true
  });

  return LoginAttempt;
};
