require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'silvas_accounting',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    seederStorage: 'sequelize'
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'mysql',
    logging: false,
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    }
  }
};
