const reportService = require('../services/reportService');

class ReportController {
  async create(req, res) {
    try {
      const report = await reportService.create(req.body);
      res.status(201).json(report);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const filters = {
        type: req.query.type,
        status: req.query.status,
        name: req.query.name,
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };
      const reports = await reportService.getAll(filters);
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const report = await reportService.getById(req.params.id);
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const report = await reportService.update(req.params.id, req.body);
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }
      res.json(report);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await reportService.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Report not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByType(req, res) {
    try {
      const reports = await reportService.getByType(req.params.type);
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRecentReports(req, res) {
    try {
      const limit = req.query.limit || 10;
      const reports = await reportService.getRecentReports(limit);
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ReportController();
