const express = require('express');
const router = express.Router();
const salesforceController = require('../controllers/salesforceController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', salesforceController.create);
router.post('/sync/:customerId', salesforceController.syncCustomer);
router.get('/', salesforceController.getAll);
router.get('/:id', salesforceController.getById);
router.put('/:id', salesforceController.update);
router.delete('/:id', salesforceController.delete);

module.exports = router;
