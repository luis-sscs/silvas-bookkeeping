const { AuditLog } = require('../models');
const { Op } = require('sequelize');

class AuditLogService {
  async log(data) {
    return await AuditLog.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.userId) where.userId = filters.userId;
    if (filters.action) where.action = filters.action;
    if (filters.entityType) where.entityType = filters.entityType;
    if (filters.entityId) where.entityId = filters.entityId;
    
    if (filters.startDate || filters.endDate) {
      where.timestamp = {};
      if (filters.startDate) where.timestamp[Op.gte] = new Date(filters.startDate);
      if (filters.endDate) where.timestamp[Op.lte] = new Date(filters.endDate);
    }
    
    return await AuditLog.findAll({ where, order: [['timestamp', 'DESC']] });
  }

  async getById(id) {
    return await AuditLog.findByPk(id);
  }

  async getByEntity(entityType, entityId) {
    return await AuditLog.findAll({
      where: { entityType, entityId },
      order: [['timestamp', 'DESC']]
    });
  }

  async getByUser(userId) {
    return await AuditLog.findAll({
      where: { userId },
      order: [['timestamp', 'DESC']]
    });
  }

  async getByAction(action) {
    return await AuditLog.findAll({
      where: { action },
      order: [['timestamp', 'DESC']]
    });
  }

  async getRecentLogs(limit = 50) {
    return await AuditLog.findAll({
      order: [['timestamp', 'DESC']],
      limit
    });
  }

  async cleanup(daysToKeep = 90) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    return await AuditLog.destroy({
      where: {
        timestamp: {
          [Op.lt]: cutoffDate
        }
      }
    });
  }
}

module.exports = new AuditLogService();
