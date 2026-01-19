const invoiceLineItemService = require('../services/invoiceLineItemService');

class InvoiceLineItemController {
  async create(req, res) {
    try {
      const item = await invoiceLineItemService.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const items = await invoiceLineItemService.getAll(req.query);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const item = await invoiceLineItemService.getById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Line item not found' });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const item = await invoiceLineItemService.update(req.params.id, req.body);
      if (!item) return res.status(404).json({ error: 'Line item not found' });
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await invoiceLineItemService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Line item not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByInvoice(req, res) {
    try {
      const items = await invoiceLineItemService.getByInvoice(req.params.invoiceId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async bulkCreate(req, res) {
    try {
      const items = await invoiceLineItemService.bulkCreate(req.body);
      res.status(201).json(items);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new InvoiceLineItemController();
