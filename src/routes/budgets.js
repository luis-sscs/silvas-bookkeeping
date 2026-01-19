const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', budgetController.create);
router.get('/', budgetController.getAll);
router.get('/over-budget', budgetController.getOverBudgets);
router.get('/year/:year', budgetController.getByYear);
router.get('/:id', budgetController.getById);
router.put('/:id', budgetController.update);
router.delete('/:id', budgetController.delete);

module.exports = router;
