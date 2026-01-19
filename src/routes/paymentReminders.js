const express = require('express');
const router = express.Router();
const paymentReminderController = require('../controllers/paymentReminderController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', paymentReminderController.create);
router.get('/', paymentReminderController.getAll);
router.get('/pending', paymentReminderController.getPending);
router.get('/overdue', paymentReminderController.getOverdue);
router.get('/:id', paymentReminderController.getById);
router.put('/:id', paymentReminderController.update);
router.delete('/:id', paymentReminderController.delete);

module.exports = router;
