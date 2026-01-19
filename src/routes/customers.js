const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', customerController.create);
router.get('/', customerController.getAll);
router.get('/active', customerController.getActiveCustomers);
router.get('/email/:email', customerController.getByEmail);
router.get('/:id', customerController.getById);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.delete);

module.exports = router;
