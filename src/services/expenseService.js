const { Expense } = require('../models');

class ExpenseService {
  async create(data) {
    return await Expense.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.category) where.category = { [require('sequelize').Op.iLike]: `%${filters.category}%` };
    
    return await Expense.findAll({ where, order: [['date', 'DESC']] });
  }

  async getById(id) {
    return await Expense.findByPk(id);
  }

  async update(id, data) {
    const expense = await Expense.findByPk(id);
    if (!expense) return null;
    return await expense.update(data);
  }

  async delete(id) {
    const expense = await Expense.findByPk(id);
    if (!expense) return false;
    await expense.destroy();
    return true;
  }
}

module.exports = new ExpenseService();
