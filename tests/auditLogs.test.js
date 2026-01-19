const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const jwt = require('jsonwebtoken');

let token;

describe('Audit Logs API', () => {
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

  it('should get audit logs', async () => {
    const response = await request(app)
      .get('/api/audit-logs')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get recent logs', async () => {
    const response = await request(app)
      .get('/api/audit-logs/recent?limit=10')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
