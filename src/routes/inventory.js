const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', inventoryController.create);
router.get('/', inventoryController.getAll);
router.get('/low-stock', inventoryController.getLowStock);
router.get('/out-of-stock', inventoryController.getOutOfStock);
router.get('/warehouse/:warehouse', inventoryController.getByWarehouse);
router.post('/:id/stock', inventoryController.updateStock);
router.get('/:id', inventoryController.getById);
router.put('/:id', inventoryController.update);
router.delete('/:id', inventoryController.delete);

module.exports = router;
