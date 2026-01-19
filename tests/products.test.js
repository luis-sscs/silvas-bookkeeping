const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

let authToken;

describe('Product API', () => {
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

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Web Development',
          type: 'service',
          description: 'Custom web development services',
          price: 150.00,
          sku: 'WEB-001',
          unit: 'hour'
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Web Development');
      expect(response.body.type).toBe('service');
    });
  });

  describe('GET /api/products', () => {
    it('should get all products', async () => {
      const response = await request(app)
        .get('/api/products')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should filter products by type', async () => {
      const response = await request(app)
        .get('/api/products?type=service')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
