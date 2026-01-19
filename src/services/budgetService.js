const { Budget } = require('../models');
const { Op } = require('sequelize');

class BudgetService {
  async create(data) {
    return await Budget.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.category) where.category = filters.category;
    if (filters.year) where.year = filters.year;
    if (filters.month) where.month = filters.month;
    if (filters.status) where.status = filters.status;
    
    return await Budget.findAll({ where, order: [['year', 'DESC'], ['month', 'DESC']] });
  }

  async getById(id) {
    return await Budget.findByPk(id);
  }

  async update(id, data) {
    const budget = await Budget.findByPk(id);
    if (!budget) return null;
    return await budget.update(data);
  }

  async delete(id) {
    const budget = await Budget.findByPk(id);
    if (!budget) return false;
    await budget.destroy();
    return true;
  }

  async getBudgetsByYear(year) {
    return await Budget.findAll({
      where: { year },
      order: [['month', 'ASC']]
    });
  }

  async updateSpent(budgetId, newSpentAmount) {
    const budget = await Budget.findByPk(budgetId);
    if (!budget) return null;

    const remaining = budget.budgetAmount - newSpentAmount;
    const status = remaining < 0 ? 'over_budget' : remaining === 0 ? 'completed' : 'on_track';

    return await budget.update({
      spentAmount: newSpentAmount,
      remainingAmount: Math.max(0, remaining),
      status
    });
  }

  async getOverBudgets() {
    return await Budget.findAll({
      where: { status: 'over_budget' },
      order: [['year', 'DESC']]
    });
  }
}

module.exports = new BudgetService();
