const salesforceService = require('../services/salesforceService');

class SalesforceController {
  async create(req, res) {
    try {
      const record = await salesforceService.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const filters = {
        status: req.query.status,
        customerId: req.query.customerId
      };
      const records = await salesforceService.getAll(filters);
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const record = await salesforceService.getById(req.params.id);
      if (!record) {
        return res.status(404).json({ error: 'Salesforce sync record not found' });
      }
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const record = await salesforceService.update(req.params.id, req.body);
      if (!record) {
        return res.status(404).json({ error: 'Salesforce sync record not found' });
      }
      res.json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await salesforceService.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Salesforce sync record not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async syncCustomer(req, res) {
    try {
      const record = await salesforceService.syncCustomer(req.params.customerId);
      res.json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new SalesforceController();
