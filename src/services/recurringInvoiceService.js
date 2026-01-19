const { RecurringInvoice, Invoice } = require('../models');
const { Op } = require('sequelize');

class RecurringInvoiceService {
  async create(data) {
    return await RecurringInvoice.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.isActive !== undefined) where.isActive = filters.isActive;
    if (filters.frequency) where.frequency = filters.frequency;
    
    return await RecurringInvoice.findAll({ where, order: [['nextInvoiceDate', 'ASC']] });
  }

  async getById(id) {
    return await RecurringInvoice.findByPk(id);
  }

  async update(id, data) {
    const recurring = await RecurringInvoice.findByPk(id);
    if (!recurring) return null;
    return await recurring.update(data);
  }

  async delete(id) {
    const recurring = await RecurringInvoice.findByPk(id);
    if (!recurring) return false;
    await recurring.destroy();
    return true;
  }

  async getDueForGeneration() {
    return await RecurringInvoice.findAll({
      where: {
        isActive: true,
        nextInvoiceDate: {
          [Op.lte]: new Date()
        }
      }
    });
  }

  async getActive() {
    return await RecurringInvoice.findAll({
      where: { isActive: true },
      order: [['nextInvoiceDate', 'ASC']]
    });
  }

  async calculateNextInvoiceDate(currentDate, frequency) {
    const next = new Date(currentDate);
    
    switch(frequency) {
      case 'daily':
        next.setDate(next.getDate() + 1);
        break;
      case 'weekly':
        next.setDate(next.getDate() + 7);
        break;
      case 'biweekly':
        next.setDate(next.getDate() + 14);
        break;
      case 'monthly':
        next.setMonth(next.getMonth() + 1);
        break;
      case 'quarterly':
        next.setMonth(next.getMonth() + 3);
        break;
      case 'yearly':
        next.setFullYear(next.getFullYear() + 1);
        break;
    }
    
    return next;
  }
}

module.exports = new RecurringInvoiceService();
