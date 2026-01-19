const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const jwt = require('jsonwebtoken');

let token;
let budgetId;

describe('Budgets API', () => {
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

  it('should create a budget', async () => {
    const response = await request(app)
      .post('/api/budgets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        budgetName: 'Q1 Travel Budget',
        category: 'Travel',
        year: 2024,
        month: 1,
        budgetAmount: 5000
      });

    expect(response.status).toBe(201);
    expect(response.body.budgetName).toBe('Q1 Travel Budget');
    budgetId = response.body.id;
  });

  it('should get budgets by year', async () => {
    const response = await request(app)
      .get('/api/budgets/year/2024')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update budget', async () => {
    const response = await request(app)
      .put(`/api/budgets/${budgetId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ spentAmount: 3000 });

    expect(response.status).toBe(200);
  });
});
