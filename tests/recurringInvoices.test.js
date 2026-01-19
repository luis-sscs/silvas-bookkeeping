const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const jwt = require('jsonwebtoken');

let token;
let recurringId;

describe('Recurring Invoices API', () => {
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

  it('should create recurring invoice', async () => {
    const response = await request(app)
      .post('/api/recurring-invoices')
      .set('Authorization', `Bearer ${token}`)
      .send({
        recurringNumber: 'REC-2024-0001',
        invoiceTemplateId: 'test-invoice',
        clientName: 'Test Client',
        clientEmail: 'client@example.com',
        amount: 1000,
        frequency: 'monthly',
        nextInvoiceDate: new Date(),
        startDate: new Date()
      });

    expect(response.status).toBe(201);
    recurringId = response.body.id;
  });

  it('should get active recurring invoices', async () => {
    const response = await request(app)
      .get('/api/recurring-invoices/active')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
