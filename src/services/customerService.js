const { Customer } = require('../models');
const { Op } = require('sequelize');

class CustomerService {
  async create(data) {
    return await Customer.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.isActive !== undefined) where.isActive = filters.isActive;
    if (filters.name) where.name = { [Op.iLike]: `%${filters.name}%` };
    if (filters.email) where.email = { [Op.iLike]: `%${filters.email}%` };
    if (filters.city) where.city = { [Op.iLike]: `%${filters.city}%` };
    
    return await Customer.findAll({ where, order: [['createdAt', 'DESC']] });
  }

  async getById(id) {
    return await Customer.findByPk(id);
  }

  async update(id, data) {
    const customer = await Customer.findByPk(id);
    if (!customer) return null;
    return await customer.update(data);
  }

  async delete(id) {
    const customer = await Customer.findByPk(id);
    if (!customer) return false;
    await customer.destroy();
    return true;
  }

  async getByEmail(email) {
    return await Customer.findOne({ where: { email } });
  }

  async getActiveCustomers() {
    return await Customer.findAll({
      where: { status: 'active', isActive: true },
      order: [['name', 'ASC']]
    });
  }
}

module.exports = new CustomerService();
