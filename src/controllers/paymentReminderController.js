const paymentReminderService = require('../services/paymentReminderService');

class PaymentReminderController {
  async create(req, res) {
    try {
      const reminder = await paymentReminderService.create(req.body);
      res.status(201).json(reminder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const reminders = await paymentReminderService.getAll(req.query);
      res.json(reminders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const reminder = await paymentReminderService.getById(req.params.id);
      if (!reminder) return res.status(404).json({ error: 'Payment reminder not found' });
      res.json(reminder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const reminder = await paymentReminderService.update(req.params.id, req.body);
      if (!reminder) return res.status(404).json({ error: 'Payment reminder not found' });
      res.json(reminder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await paymentReminderService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Payment reminder not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPending(req, res) {
    try {
      const reminders = await paymentReminderService.getPending();
      res.json(reminders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOverdue(req, res) {
    try {
      const reminders = await paymentReminderService.getOverdueReminders();
      res.json(reminders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PaymentReminderController();
