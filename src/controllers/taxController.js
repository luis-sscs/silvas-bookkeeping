const taxService = require('../services/taxService');

class TaxController {
  async create(req, res) {
    try {
      const tax = await taxService.create(req.body);
      res.status(201).json(tax);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const taxes = await taxService.getAll(req.query);
      res.json(taxes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const tax = await taxService.getById(req.params.id);
      if (!tax) return res.status(404).json({ error: 'Tax not found' });
      res.json(tax);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const tax = await taxService.update(req.params.id, req.body);
      if (!tax) return res.status(404).json({ error: 'Tax not found' });
      res.json(tax);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await taxService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Tax not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByRegion(req, res) {
    try {
      const taxes = await taxService.getByRegion(req.params.region);
      res.json(taxes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async calculateTax(req, res) {
    try {
      const { amount, taxId } = req.body;
      const taxAmount = await taxService.calculateTax(amount, taxId);
      res.json({ amount, taxId, taxAmount });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getActive(req, res) {
    try {
      const taxes = await taxService.getActiveTaxes();
      res.json(taxes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TaxController();
