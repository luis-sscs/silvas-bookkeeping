const { Invoice } = require('../models');

class InvoiceService {
  async create(data) {
    return await Invoice.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.clientName) where.clientName = { [require('sequelize').Op.iLike]: `%${filters.clientName}%` };
    
    return await Invoice.findAll({ where, order: [['createdAt', 'DESC']] });
  }

  async getById(id) {
    return await Invoice.findByPk(id);
  }

  async update(id, data) {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) return null;
    return await invoice.update(data);
  }

  async delete(id) {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) return false;
    await invoice.destroy();
    return true;
  }
}

module.exports = new InvoiceService();
