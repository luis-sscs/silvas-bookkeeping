const express = require('express');
const router = express.Router();
const recurringInvoiceController = require('../controllers/recurringInvoiceController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', recurringInvoiceController.create);
router.get('/', recurringInvoiceController.getAll);
router.get('/active', recurringInvoiceController.getActive);
router.get('/due', recurringInvoiceController.getDue);
router.get('/:id', recurringInvoiceController.getById);
router.put('/:id', recurringInvoiceController.update);
router.delete('/:id', recurringInvoiceController.delete);

module.exports = router;
