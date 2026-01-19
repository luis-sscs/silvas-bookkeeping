const { Payment, Invoice } = require('../models');
const { Op } = require('sequelize');

class PaymentService {
  async create(data) {
    return await Payment.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.paymentMethod) where.paymentMethod = filters.paymentMethod;
    if (filters.invoiceId) where.invoiceId = filters.invoiceId;
    
    if (filters.startDate || filters.endDate) {
      where.paymentDate = {};
      if (filters.startDate) where.paymentDate[Op.gte] = new Date(filters.startDate);
      if (filters.endDate) where.paymentDate[Op.lte] = new Date(filters.endDate);
    }
    
    return await Payment.findAll({ where, order: [['paymentDate', 'DESC']], include: [{ model: Invoice, attributes: ['invoiceNumber', 'amount'] }] });
  }

  async getById(id) {
    return await Payment.findByPk(id, { include: [Invoice] });
  }

  async update(id, data) {
    const payment = await Payment.findByPk(id);
    if (!payment) return null;
    return await payment.update(data);
  }

  async delete(id) {
    const payment = await Payment.findByPk(id);
    if (!payment) return false;
    await payment.destroy();
    return true;
  }

  async getByInvoice(invoiceId) {
    return await Payment.findAll({
      where: { invoiceId },
      order: [['paymentDate', 'DESC']]
    });
  }

  async getTotalPayments(filters = {}) {
    const where = { status: 'completed' };
    if (filters.startDate || filters.endDate) {
      where.paymentDate = {};
      if (filters.startDate) where.paymentDate[Op.gte] = new Date(filters.startDate);
      if (filters.endDate) where.paymentDate[Op.lte] = new Date(filters.endDate);
    }
    
    const result = await Payment.sum('amount', { where });
    return result || 0;
  }
}

module.exports = new PaymentService();
