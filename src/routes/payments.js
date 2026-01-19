const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', paymentController.create);
router.get('/', paymentController.getAll);
router.get('/total', paymentController.getTotalPayments);
router.get('/invoice/:invoiceId', paymentController.getByInvoice);
router.get('/:id', paymentController.getById);
router.put('/:id', paymentController.update);
router.delete('/:id', paymentController.delete);

module.exports = router;
