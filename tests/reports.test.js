const request = require('supertest');
const app = require('../app');
const { sequelize, Report } = require('../models');
const jwt = require('jsonwebtoken');

let token;
let reportId;

describe('Reports API', () => {
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

  describe('POST /api/reports - Create Report', () => {
    it('should create a new report', async () => {
      const newReport = {
        reportNumber: 'RPT-2024-0001',
        name: 'Monthly Revenue Report',
        description: 'January 2024 revenue summary',
        type: 'income',
        generatedBy: 'admin',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31'),
        status: 'completed',
        format: 'json'
      };

      const response = await request(app)
        .post('/api/reports')
        .set('Authorization', `Bearer ${token}`)
        .send(newReport);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newReport.name);
      expect(response.body.type).toBe(newReport.type);
      reportId = response.body.id;
    });

    it('should fail without authentication', async () => {
      const response = await request(app)
        .post('/api/reports')
        .send({ name: 'Test Report', type: 'invoice' });

      expect(response.status).toBe(401);
    });

    it('should create report with JSON data', async () => {
      const response = await request(app)
        .post('/api/reports')
        .set('Authorization', `Bearer ${token}`)
        .send({
          reportNumber: 'RPT-2024-0002',
          name: 'Expense Report',
          type: 'expense',
          reportData: { total: 5000, byCategory: { travel: 2000, supplies: 3000 } },
          status: 'completed'
        });

      expect(response.status).toBe(201);
      expect(response.body.reportData).toEqual({ total: 5000, byCategory: { travel: 2000, supplies: 3000 } });
    });
  });

  describe('GET /api/reports - Get All Reports', () => {
    it('should retrieve all reports', async () => {
      const response = await request(app)
        .get('/api/reports')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should filter reports by type', async () => {
      const response = await request(app)
        .get('/api/reports?type=income')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should filter reports by status', async () => {
      const response = await request(app)
        .get('/api/reports?status=completed')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should filter reports by date range', async () => {
      const response = await request(app)
        .get('/api/reports?startDate=2024-01-01&endDate=2024-01-31')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/reports/:id - Get Report by ID', () => {
    it('should retrieve a specific report', async () => {
      const response = await request(app)
        .get(`/api/reports/${reportId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(reportId);
    });

    it('should return 404 for non-existent report', async () => {
      const response = await request(app)
        .get('/api/reports/non-existent-id')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/reports/type/:type - Get Reports by Type', () => {
    it('should retrieve reports by type', async () => {
      const response = await request(app)
        .get('/api/reports/type/income')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return empty array for non-existent type', async () => {
      const response = await request(app)
        .get('/api/reports/type/nonexistent')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/reports/recent - Get Recent Reports', () => {
    it('should retrieve recent reports', async () => {
      const response = await request(app)
        .get('/api/reports/recent')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should limit recent reports', async () => {
      const response = await request(app)
        .get('/api/reports/recent?limit=5')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBeLessThanOrEqual(5);
    });
  });

  describe('PUT /api/reports/:id - Update Report', () => {
    it('should update a report', async () => {
      const updates = {
        status: 'archived',
        format: 'pdf'
      };

      const response = await request(app)
        .put(`/api/reports/${reportId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('archived');
      expect(response.body.format).toBe('pdf');
    });

    it('should return 404 when updating non-existent report', async () => {
      const response = await request(app)
        .put('/api/reports/non-existent-id')
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'archived' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/reports/:id - Delete Report', () => {
    it('should delete a report', async () => {
      const response = await request(app)
        .delete(`/api/reports/${reportId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('should return 404 when deleting non-existent report', async () => {
      const response = await request(app)
        .delete('/api/reports/non-existent-id')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });
});
