const invoiceService = require('../services/invoiceService');

class InvoiceController {
  async create(req, res) {
    try {
      const invoice = await invoiceService.create(req.body);
      res.status(201).json(invoice);
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
      const invoices = await invoiceService.getAll(filters);
      res.json(invoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const invoice = await invoiceService.getById(req.params.id);
      if (!invoice) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
      res.json(invoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const invoice = await invoiceService.update(req.params.id, req.body);
      if (!invoice) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
      res.json(invoice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await invoiceService.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new InvoiceController();
