const { Report } = require('../models');
const { Op } = require('sequelize');

class ReportService {
  async create(data) {
    return await Report.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.type) where.type = filters.type;
    if (filters.status) where.status = filters.status;
    if (filters.name) where.name = { [Op.iLike]: `%${filters.name}%` };
    
    const queryOptions = { where, order: [['generatedDate', 'DESC']] };
    
    if (filters.startDate || filters.endDate) {
      where.generatedDate = {};
      if (filters.startDate) where.generatedDate[Op.gte] = new Date(filters.startDate);
      if (filters.endDate) where.generatedDate[Op.lte] = new Date(filters.endDate);
    }
    
    return await Report.findAll(queryOptions);
  }

  async getById(id) {
    return await Report.findByPk(id);
  }

  async update(id, data) {
    const report = await Report.findByPk(id);
    if (!report) return null;
    return await report.update(data);
  }

  async delete(id) {
    const report = await Report.findByPk(id);
    if (!report) return false;
    await report.destroy();
    return true;
  }

  async getByType(type) {
    return await Report.findAll({
      where: { type },
      order: [['generatedDate', 'DESC']]
    });
  }

  async getRecentReports(limit = 10) {
    return await Report.findAll({
      where: { status: 'completed' },
      order: [['generatedDate', 'DESC']],
      limit
    });
  }
}

module.exports = new ReportService();
