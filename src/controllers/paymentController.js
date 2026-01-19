const paymentService = require('../services/paymentService');

class PaymentController {
  async create(req, res) {
    try {
      const payment = await paymentService.create(req.body);
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const payments = await paymentService.getAll(req.query);
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const payment = await paymentService.getById(req.params.id);
      if (!payment) return res.status(404).json({ error: 'Payment not found' });
      res.json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const payment = await paymentService.update(req.params.id, req.body);
      if (!payment) return res.status(404).json({ error: 'Payment not found' });
      res.json(payment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await paymentService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Payment not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByInvoice(req, res) {
    try {
      const payments = await paymentService.getByInvoice(req.params.invoiceId);
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTotalPayments(req, res) {
    try {
      const total = await paymentService.getTotalPayments(req.query);
      res.json({ total });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PaymentController();
