const budgetService = require('../services/budgetService');

class BudgetController {
  async create(req, res) {
    try {
      const budget = await budgetService.create(req.body);
      res.status(201).json(budget);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const budgets = await budgetService.getAll(req.query);
      res.json(budgets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const budget = await budgetService.getById(req.params.id);
      if (!budget) return res.status(404).json({ error: 'Budget not found' });
      res.json(budget);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const budget = await budgetService.update(req.params.id, req.body);
      if (!budget) return res.status(404).json({ error: 'Budget not found' });
      res.json(budget);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await budgetService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Budget not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByYear(req, res) {
    try {
      const budgets = await budgetService.getBudgetsByYear(parseInt(req.params.year));
      res.json(budgets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOverBudgets(req, res) {
    try {
      const budgets = await budgetService.getOverBudgets();
      res.json(budgets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BudgetController();
