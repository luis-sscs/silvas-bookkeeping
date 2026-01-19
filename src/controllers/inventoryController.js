const inventoryService = require('../services/inventoryService');

class InventoryController {
  async create(req, res) {
    try {
      const item = await inventoryService.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const items = await inventoryService.getAll(req.query);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const item = await inventoryService.getById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Inventory item not found' });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const item = await inventoryService.update(req.params.id, req.body);
      if (!item) return res.status(404).json({ error: 'Inventory item not found' });
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await inventoryService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Inventory item not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getLowStock(req, res) {
    try {
      const items = await inventoryService.getLowStock();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByWarehouse(req, res) {
    try {
      const items = await inventoryService.getByWarehouse(req.params.warehouse);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateStock(req, res) {
    try {
      const { quantity, operation } = req.body;
      const item = await inventoryService.updateStock(req.params.id, quantity, operation);
      if (!item) return res.status(404).json({ error: 'Inventory item not found' });
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getOutOfStock(req, res) {
    try {
      const items = await inventoryService.getOutOfStock();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new InventoryController();
