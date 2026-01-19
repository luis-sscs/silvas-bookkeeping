const { Tax } = require('../models');
const { Op } = require('sequelize');

class TaxService {
  async create(data) {
    return await Tax.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.region) where.region = filters.region;
    if (filters.country) where.country = filters.country;
    if (filters.taxType) where.taxType = filters.taxType;
    if (filters.isActive !== undefined) where.isActive = filters.isActive;
    
    return await Tax.findAll({ where, order: [['taxName', 'ASC']] });
  }

  async getById(id) {
    return await Tax.findByPk(id);
  }

  async update(id, data) {
    const tax = await Tax.findByPk(id);
    if (!tax) return null;
    return await tax.update(data);
  }

  async delete(id) {
    const tax = await Tax.findByPk(id);
    if (!tax) return false;
    await tax.destroy();
    return true;
  }

  async getByRegion(region) {
    return await Tax.findAll({
      where: { region, isActive: true },
      order: [['rate', 'DESC']]
    });
  }

  async calculateTax(amount, taxId) {
    const tax = await Tax.findByPk(taxId);
    if (!tax) return 0;
    return (amount * tax.rate / 100).toFixed(2);
  }

  async getActiveTaxes() {
    return await Tax.findAll({
      where: { isActive: true },
      order: [['taxName', 'ASC']]
    });
  }
}

module.exports = new TaxService();
