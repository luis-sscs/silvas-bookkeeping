const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const jwt = require('jsonwebtoken');

let token;
let taxId;

describe('Taxes API', () => {
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

  it('should create a tax', async () => {
    const response = await request(app)
      .post('/api/taxes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        taxName: 'Sales Tax CA',
        taxCode: 'CA-SALES',
        rate: 7.25,
        region: 'California'
      });

    expect(response.status).toBe(201);
    expect(response.body.taxCode).toBe('CA-SALES');
    taxId = response.body.id;
  });

  it('should get active taxes', async () => {
    const response = await request(app)
      .get('/api/taxes/active')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should calculate tax', async () => {
    const response = await request(app)
      .post('/api/taxes/calculate')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 1000, taxId });

    expect(response.status).toBe(200);
    expect(response.body.taxAmount).toBeDefined();
  });
});
