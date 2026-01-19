const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const jwt = require('jsonwebtoken');

let token;
let paymentId;

describe('Payments API', () => {
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

  it('should create a payment', async () => {
    const response = await request(app)
      .post('/api/payments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        paymentNumber: 'PAY-2024-0001',
        invoiceId: 'test-invoice',
        amount: 1000,
        paymentMethod: 'bank_transfer'
      });

    expect(response.status).toBe(201);
    expect(response.body.paymentNumber).toBe('PAY-2024-0001');
    paymentId = response.body.id;
  });

  it('should get all payments', async () => {
    const response = await request(app)
      .get('/api/payments')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get payment by id', async () => {
    const response = await request(app)
      .get(`/api/payments/${paymentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(paymentId);
  });

  it('should update payment', async () => {
    const response = await request(app)
      .put(`/api/payments/${paymentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'completed' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('completed');
  });

  it('should delete payment', async () => {
    const response = await request(app)
      .delete(`/api/payments/${paymentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
