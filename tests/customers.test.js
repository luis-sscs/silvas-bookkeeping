const request = require('supertest');
const app = require('../app');
const { sequelize, Customer } = require('../models');
const jwt = require('jsonwebtoken');

let token;
let customerId;

describe('Customers API', () => {
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

  describe('POST /api/customers - Create Customer', () => {
    it('should create a new customer', async () => {
      const newCustomer = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        companyName: 'Doe Corp',
        taxId: 'TAX-001',
        status: 'active'
      };

      const response = await request(app)
        .post('/api/customers')
        .set('Authorization', `Bearer ${token}`)
        .send(newCustomer);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newCustomer.name);
      expect(response.body.email).toBe(newCustomer.email);
      customerId = response.body.id;
    });

    it('should fail without authentication', async () => {
      const response = await request(app)
        .post('/api/customers')
        .send({ name: 'Test Customer', email: 'test@example.com' });

      expect(response.status).toBe(401);
    });

    it('should fail with invalid email', async () => {
      const response = await request(app)
        .post('/api/customers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Customer',
          email: 'invalid-email'
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/customers - Get All Customers', () => {
    it('should retrieve all customers', async () => {
      const response = await request(app)
        .get('/api/customers')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should filter customers by status', async () => {
      const response = await request(app)
        .get('/api/customers?status=active')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should filter customers by name', async () => {
      const response = await request(app)
        .get('/api/customers?name=John')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/customers/:id - Get Customer by ID', () => {
    it('should retrieve a specific customer', async () => {
      const response = await request(app)
        .get(`/api/customers/${customerId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(customerId);
      expect(response.body.name).toBe('John Doe');
    });

    it('should return 404 for non-existent customer', async () => {
      const response = await request(app)
        .get('/api/customers/non-existent-id')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/customers/email/:email - Get Customer by Email', () => {
    it('should retrieve a customer by email', async () => {
      const response = await request(app)
        .get('/api/customers/email/john@example.com')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe('john@example.com');
    });

    it('should return 404 for non-existent email', async () => {
      const response = await request(app)
        .get('/api/customers/email/nonexistent@example.com')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/customers/:id - Update Customer', () => {
    it('should update a customer', async () => {
      const updates = {
        phone: '555-9999',
        city: 'Los Angeles',
        status: 'inactive'
      };

      const response = await request(app)
        .put(`/api/customers/${customerId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body.phone).toBe('555-9999');
      expect(response.body.city).toBe('Los Angeles');
      expect(response.body.status).toBe('inactive');
    });

    it('should return 404 when updating non-existent customer', async () => {
      const response = await request(app)
        .put('/api/customers/non-existent-id')
        .set('Authorization', `Bearer ${token}`)
        .send({ phone: '555-1111' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/customers/:id - Delete Customer', () => {
    it('should delete a customer', async () => {
      const response = await request(app)
        .delete(`/api/customers/${customerId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('should return 404 when deleting non-existent customer', async () => {
      const response = await request(app)
        .delete('/api/customers/non-existent-id')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/customers/active - Get Active Customers', () => {
    it('should retrieve only active customers', async () => {
      // Create an active customer
      await request(app)
        .post('/api/customers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Active Customer',
          email: 'active@example.com',
          status: 'active',
          isActive: true
        });

      const response = await request(app)
        .get('/api/customers/active')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
