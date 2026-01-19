const productService = require('../services/productService');

class ProductController {
  async create(req, res) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const filters = {
        type: req.query.type,
        isActive: req.query.isActive,
        name: req.query.name
      };
      const products = await productService.getAll(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const product = await productService.getById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const product = await productService.update(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await productService.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();
