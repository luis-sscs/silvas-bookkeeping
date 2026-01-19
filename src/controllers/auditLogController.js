const auditLogService = require('../services/auditLogService');

class AuditLogController {
  async getAll(req, res) {
    try {
      const logs = await auditLogService.getAll(req.query);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const log = await auditLogService.getById(req.params.id);
      if (!log) return res.status(404).json({ error: 'Audit log not found' });
      res.json(log);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByEntity(req, res) {
    try {
      const logs = await auditLogService.getByEntity(req.params.entityType, req.params.entityId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByUser(req, res) {
    try {
      const logs = await auditLogService.getByUser(req.params.userId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByAction(req, res) {
    try {
      const logs = await auditLogService.getByAction(req.params.action);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRecent(req, res) {
    try {
      const limit = req.query.limit || 50;
      const logs = await auditLogService.getRecentLogs(limit);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AuditLogController();
