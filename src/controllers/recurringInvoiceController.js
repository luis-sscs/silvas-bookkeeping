const recurringInvoiceService = require('../services/recurringInvoiceService');

class RecurringInvoiceController {
  async create(req, res) {
    try {
      const recurring = await recurringInvoiceService.create(req.body);
      res.status(201).json(recurring);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const recurring = await recurringInvoiceService.getAll(req.query);
      res.json(recurring);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const recurring = await recurringInvoiceService.getById(req.params.id);
      if (!recurring) return res.status(404).json({ error: 'Recurring invoice not found' });
      res.json(recurring);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const recurring = await recurringInvoiceService.update(req.params.id, req.body);
      if (!recurring) return res.status(404).json({ error: 'Recurring invoice not found' });
      res.json(recurring);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await recurringInvoiceService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Recurring invoice not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDue(req, res) {
    try {
      const recurring = await recurringInvoiceService.getDueForGeneration();
      res.json(recurring);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getActive(req, res) {
    try {
      const recurring = await recurringInvoiceService.getActive();
      res.json(recurring);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RecurringInvoiceController();
