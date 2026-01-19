const currencyService = require('../services/currencyService');

class CurrencyController {
  async create(req, res) {
    try {
      const currency = await currencyService.create(req.body);
      res.status(201).json(currency);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const currencies = await currencyService.getAll(req.query);
      res.json(currencies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const currency = await currencyService.getById(req.params.id);
      if (!currency) return res.status(404).json({ error: 'Currency not found' });
      res.json(currency);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const currency = await currencyService.update(req.params.id, req.body);
      if (!currency) return res.status(404).json({ error: 'Currency not found' });
      res.json(currency);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await currencyService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Currency not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getActive(req, res) {
    try {
      const currencies = await currencyService.getActive();
      res.json(currencies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async convert(req, res) {
    try {
      const { amount, fromCurrency, toCurrency } = req.body;
      const converted = await currencyService.convertAmount(amount, fromCurrency, toCurrency);
      res.json({ amount, fromCurrency, toCurrency, converted });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getBase(req, res) {
    try {
      const currency = await currencyService.getBaseCurrency();
      if (!currency) return res.status(404).json({ error: 'Base currency not found' });
      res.json(currency);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CurrencyController();
