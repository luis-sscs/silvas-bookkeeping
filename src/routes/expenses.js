const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', expenseController.create);
router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getById);
router.put('/:id', expenseController.update);
router.delete('/:id', expenseController.delete);

module.exports = router;
