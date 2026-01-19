const { Currency } = require('../models');
const { Op } = require('sequelize');

class CurrencyService {
  async create(data) {
    return await Currency.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.isActive !== undefined) where.isActive = filters.isActive;
    if (filters.country) where.country = filters.country;
    
    return await Currency.findAll({ where, order: [['currencyName', 'ASC']] });
  }

  async getById(id) {
    return await Currency.findByPk(id);
  }

  async update(id, data) {
    const currency = await Currency.findByPk(id);
    if (!currency) return null;
    return await currency.update(data);
  }

  async delete(id) {
    const currency = await Currency.findByPk(id);
    if (!currency) return false;
    await currency.destroy();
    return true;
  }

  async getByCurrencyCode(code) {
    return await Currency.findOne({ where: { currencyCode: code.toUpperCase() } });
  }

  async convertAmount(amount, fromCurrencyCode, toCurrencyCode) {
    const fromCurrency = await this.getByCurrencyCode(fromCurrencyCode);
    const toCurrency = await this.getByCurrencyCode(toCurrencyCode);

    if (!fromCurrency || !toCurrency) {
      throw new Error('Currency not found');
    }

    const amountInBase = amount / fromCurrency.exchangeRate;
    const convertedAmount = amountInBase * toCurrency.exchangeRate;

    return convertedAmount.toFixed(2);
  }

  async getActive() {
    return await Currency.findAll({
      where: { isActive: true },
      order: [['currencyCode', 'ASC']]
    });
  }

  async getBaseCurrency() {
    return await Currency.findOne({ where: { baseCurrency: true } });
  }

  async updateExchangeRate(currencyCode, rate) {
    return await Currency.update(
      { exchangeRate: rate, lastUpdated: new Date() },
      { where: { currencyCode: currencyCode.toUpperCase() } }
    );
  }
}

module.exports = new CurrencyService();
