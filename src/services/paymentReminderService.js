const { PaymentReminder, Invoice } = require('../models');
const { Op } = require('sequelize');

class PaymentReminderService {
  async create(data) {
    return await PaymentReminder.create(data);
  }

  async getAll(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.reminderType) where.reminderType = filters.reminderType;
    if (filters.invoiceId) where.invoiceId = filters.invoiceId;
    
    return await PaymentReminder.findAll({ where, order: [['reminderDate', 'ASC']] });
  }

  async getById(id) {
    return await PaymentReminder.findByPk(id, { include: [Invoice] });
  }

  async update(id, data) {
    const reminder = await PaymentReminder.findByPk(id);
    if (!reminder) return null;
    return await reminder.update(data);
  }

  async delete(id) {
    const reminder = await PaymentReminder.findByPk(id);
    if (!reminder) return false;
    await reminder.destroy();
    return true;
  }

  async getPending() {
    return await PaymentReminder.findAll({
      where: {
        status: 'pending',
        reminderDate: {
          [Op.lte]: new Date()
        }
      },
      include: [Invoice],
      order: [['reminderDate', 'ASC']]
    });
  }

  async markAsSent(reminderId) {
    return await PaymentReminder.update(
      {
        status: 'sent',
        sentDate: new Date(),
        deliveryAttempts: this.sequelize.where(
          this.sequelize.col('deliveryAttempts'),
          Op.plus,
          1
        )
      },
      { where: { id: reminderId } }
    );
  }

  async getOverdueReminders() {
    return await PaymentReminder.findAll({
      where: {
        reminderType: 'overdue',
        status: 'pending'
      },
      include: [Invoice],
      order: [['reminderDate', 'ASC']]
    });
  }
}

module.exports = new PaymentReminderService();
