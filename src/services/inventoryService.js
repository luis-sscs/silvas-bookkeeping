const { InventoryItem, Product } = require('../models');
const { Op } = require('sequelize');

class InventoryService {
  async create(data) {
    return await InventoryItem.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.warehouse) where.warehouse = filters.warehouse;
    
    return await InventoryItem.findAll({
      where,
      include: [Product],
      order: [['currentStock', 'ASC']]
    });
  }

  async getById(id) {
    return await InventoryItem.findByPk(id, { include: [Product] });
  }

  async update(id, data) {
    const item = await InventoryItem.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }

  async delete(id) {
    const item = await InventoryItem.findByPk(id);
    if (!item) return false;
    await item.destroy();
    return true;
  }

  async getLowStock() {
    return await InventoryItem.findAll({
      where: {
        [Op.or]: [
          { status: 'low_stock' },
          { status: 'out_of_stock' }
        ]
      },
      include: [Product],
      order: [['currentStock', 'ASC']]
    });
  }

  async getByWarehouse(warehouse) {
    return await InventoryItem.findAll({
      where: { warehouse },
      include: [Product],
      order: [['currentStock', 'DESC']]
    });
  }

  async updateStock(itemId, quantity, operation = 'add') {
    const item = await InventoryItem.findByPk(itemId);
    if (!item) return null;

    let newStock;
    if (operation === 'add') {
      newStock = parseFloat(item.currentStock) + quantity;
    } else if (operation === 'subtract') {
      newStock = Math.max(0, parseFloat(item.currentStock) - quantity);
    } else {
      newStock = quantity;
    }

    let status = 'in_stock';
    if (newStock === 0) {
      status = 'out_of_stock';
    } else if (item.minimumStock && newStock <= item.minimumStock) {
      status = 'low_stock';
    }

    return await item.update({
      currentStock: newStock,
      status
    });
  }

  async getOutOfStock() {
    return await InventoryItem.findAll({
      where: { status: 'out_of_stock' },
      include: [Product]
    });
  }
}

module.exports = new InventoryService();
