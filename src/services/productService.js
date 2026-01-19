const { Product } = require('../models');

class ProductService {
  async create(data) {
    return await Product.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.type) where.type = filters.type;
    if (filters.isActive !== undefined) where.isActive = filters.isActive;
    if (filters.name) where.name = { [require('sequelize').Op.iLike]: `%${filters.name}%` };
    
    return await Product.findAll({ where, order: [['createdAt', 'DESC']] });
  }

  async getById(id) {
    return await Product.findByPk(id);
  }

  async update(id, data) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    return await product.update(data);
  }

  async delete(id) {
    const product = await Product.findByPk(id);
    if (!product) return false;
    await product.destroy();
    return true;
  }
}

module.exports = new ProductService();
