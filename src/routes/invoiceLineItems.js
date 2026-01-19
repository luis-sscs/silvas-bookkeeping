const express = require('express');
const router = express.Router();
const invoiceLineItemController = require('../controllers/invoiceLineItemController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', invoiceLineItemController.create);
router.post('/bulk', invoiceLineItemController.bulkCreate);
router.get('/', invoiceLineItemController.getAll);
router.get('/invoice/:invoiceId', invoiceLineItemController.getByInvoice);
router.get('/:id', invoiceLineItemController.getById);
router.put('/:id', invoiceLineItemController.update);
router.delete('/:id', invoiceLineItemController.delete);

module.exports = router;
