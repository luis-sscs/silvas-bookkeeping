const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const jwt = require('jsonwebtoken');

let token;

describe('Inventory API', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    token = jwt.sign(
      { id: 'test-user', email: 'test@example.com' },
      process.env.JWT_SECRET || 'test-secret-key',
      { expiresIn: '24h' }
    );
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should get low stock items', async () => {
    const response = await request(app)
      .get('/api/inventory/low-stock')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get out of stock items', async () => {
    const response = await request(app)
      .get('/api/inventory/out-of-stock')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
