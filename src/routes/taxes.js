const express = require('express');
const router = express.Router();
const taxController = require('../controllers/taxController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', taxController.create);
router.get('/', taxController.getAll);
router.get('/active', taxController.getActive);
router.get('/region/:region', taxController.getByRegion);
router.post('/calculate', taxController.calculateTax);
router.get('/:id', taxController.getById);
router.put('/:id', taxController.update);
router.delete('/:id', taxController.delete);

module.exports = router;
