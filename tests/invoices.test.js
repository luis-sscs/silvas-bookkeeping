const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

let authToken;

describe('Invoice API', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    
    // Create a user and get token
    const authResponse = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    
    authToken = authResponse.body.token;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /api/invoices', () => {
    it('should create a new invoice', async () => {
      const response = await request(app)
        .post('/api/invoices')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          invoiceNumber: 'INV-001',
          clientName: 'Test Client',
          clientEmail: 'client@example.com',
          amount: 1000.00,
          issueDate: new Date(),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          description: 'Test invoice'
        });

      expect(response.status).toBe(201);
      expect(response.body.invoiceNumber).toBe('INV-001');
      expect(response.body.clientName).toBe('Test Client');
    });

    it('should fail without authorization', async () => {
      const response = await request(app)
        .post('/api/invoices')
        .send({
          invoiceNumber: 'INV-002',
          clientName: 'Test Client',
          clientEmail: 'client@example.com',
          amount: 500.00,
          issueDate: new Date(),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/invoices', () => {
    it('should get all invoices', async () => {
      const response = await request(app)
        .get('/api/invoices')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
