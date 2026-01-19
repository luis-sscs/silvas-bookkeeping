const customerService = require('../services/customerService');

class CustomerController {
  async create(req, res) {
    try {
      const customer = await customerService.create(req.body);
      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const filters = {
        status: req.query.status,
        isActive: req.query.isActive,
        name: req.query.name,
        email: req.query.email,
        city: req.query.city
      };
      const customers = await customerService.getAll(filters);
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const customer = await customerService.getById(req.params.id);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.json(customer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const customer = await customerService.update(req.params.id, req.body);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.json(customer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await customerService.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByEmail(req, res) {
    try {
      const customer = await customerService.getByEmail(req.params.email);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.json(customer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getActiveCustomers(req, res) {
    try {
      const customers = await customerService.getActiveCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CustomerController();
