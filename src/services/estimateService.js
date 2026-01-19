const { Estimate } = require('../models');

class EstimateService {
  async create(data) {
    return await Estimate.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.clientName) where.clientName = { [require('sequelize').Op.iLike]: `%${filters.clientName}%` };
    
    return await Estimate.findAll({ where, order: [['createdAt', 'DESC']] });
  }

  async getById(id) {
    return await Estimate.findByPk(id);
  }

  async update(id, data) {
    const estimate = await Estimate.findByPk(id);
    if (!estimate) return null;
    return await estimate.update(data);
  }

  async delete(id) {
    const estimate = await Estimate.findByPk(id);
    if (!estimate) return false;
    await estimate.destroy();
    return true;
  }
}

module.exports = new EstimateService();
