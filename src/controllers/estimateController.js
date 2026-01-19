const estimateService = require('../services/estimateService');

class EstimateController {
  async create(req, res) {
    try {
      const estimate = await estimateService.create(req.body);
      res.status(201).json(estimate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const filters = {
        status: req.query.status,
        clientName: req.query.clientName
      };
      const estimates = await estimateService.getAll(filters);
      res.json(estimates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const estimate = await estimateService.getById(req.params.id);
      if (!estimate) {
        return res.status(404).json({ error: 'Estimate not found' });
      }
      res.json(estimate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const estimate = await estimateService.update(req.params.id, req.body);
      if (!estimate) {
        return res.status(404).json({ error: 'Estimate not found' });
      }
      res.json(estimate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await estimateService.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Estimate not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EstimateController();
