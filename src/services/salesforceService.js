const { SalesforceSync, Customer } = require('../models');

class SalesforceService {
  async create(data) {
    const customer = await Customer.findByPk(data.customerId);
    if (!customer) {
      throw new Error('Customer not found for Salesforce sync');
    }

    return await SalesforceSync.create({
      customerId: data.customerId,
      salesforceAccountId: data.salesforceAccountId || null,
      status: data.status || 'pending',
      lastSyncedAt: data.lastSyncedAt || null,
      errorMessage: data.errorMessage || null
    });
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.customerId) where.customerId = filters.customerId;

    return await SalesforceSync.findAll({
      where,
      order: [['updatedAt', 'DESC']],
      include: [{ model: Customer, as: 'customer' }]
    });
  }

  async getById(id) {
    return await SalesforceSync.findByPk(id, {
      include: [{ model: Customer, as: 'customer' }]
    });
  }

  async update(id, data) {
    const record = await SalesforceSync.findByPk(id);
    if (!record) return null;

    if (data.customerId && data.customerId !== record.customerId) {
      const customer = await Customer.findByPk(data.customerId);
      if (!customer) {
        throw new Error('Customer not found for Salesforce sync');
      }
    }

    return await record.update({
      customerId: data.customerId || record.customerId,
      salesforceAccountId: data.salesforceAccountId ?? record.salesforceAccountId,
      status: data.status || record.status,
      lastSyncedAt: data.lastSyncedAt ?? record.lastSyncedAt,
      errorMessage: data.errorMessage ?? record.errorMessage
    });
  }

  async delete(id) {
    const record = await SalesforceSync.findByPk(id);
    if (!record) return false;
    await record.destroy();
    return true;
  }

  async syncCustomer(customerId) {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      throw new Error('Customer not found for Salesforce sync');
    }

    const salesforceAccountId = `SF-ACC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

    const [record, created] = await SalesforceSync.findOrCreate({
      where: { customerId },
      defaults: {
        customerId,
        salesforceAccountId,
        status: 'synced',
        lastSyncedAt: new Date(),
        errorMessage: null
      }
    });

    if (!created) {
      await record.update({
        salesforceAccountId,
        status: 'synced',
        lastSyncedAt: new Date(),
        errorMessage: null
      });
    }

    return record;
  }
}

module.exports = new SalesforceService();
