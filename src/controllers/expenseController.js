const expenseService = require('../services/expenseService');

class ExpenseController {
  async create(req, res) {
    try {
      const expense = await expenseService.create(req.body);
      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const filters = {
        status: req.query.status,
        category: req.query.category
      };
      const expenses = await expenseService.getAll(filters);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const expense = await expenseService.getById(req.params.id);
      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.json(expense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const expense = await expenseService.update(req.params.id, req.body);
      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.json(expense);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await expenseService.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ExpenseController();
