const { InvoiceLineItem, Invoice, Product, Tax } = require('../models');

class InvoiceLineItemService {
  async create(data) {
    return await InvoiceLineItem.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.invoiceId) where.invoiceId = filters.invoiceId;
    if (filters.productId) where.productId = filters.productId;
    
    return await InvoiceLineItem.findAll({
      where,
      include: [
        { model: Product, attributes: ['name', 'sku'] },
        { model: Tax, attributes: ['taxName', 'rate'] }
      ],
      order: [['createdAt', 'ASC']]
    });
  }

  async getById(id) {
    return await InvoiceLineItem.findByPk(id, {
      include: [Product, Tax]
    });
  }

  async update(id, data) {
    const item = await InvoiceLineItem.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }

  async delete(id) {
    const item = await InvoiceLineItem.findByPk(id);
    if (!item) return false;
    await item.destroy();
    return true;
  }

  async getByInvoice(invoiceId) {
    return await InvoiceLineItem.findAll({
      where: { invoiceId },
      include: [Product, Tax],
      order: [['createdAt', 'ASC']]
    });
  }

  async calculateLineTotal(quantity, unitPrice, discount = 0) {
    const subtotal = quantity * unitPrice;
    const discountAmount = (subtotal * discount / 100);
    return (subtotal - discountAmount).toFixed(2);
  }

  async bulkCreate(lineItems) {
    return await InvoiceLineItem.bulkCreate(lineItems);
  }
}

module.exports = new InvoiceLineItemService();
