const express = require('express');
const router = express.Router();
const estimateController = require('../controllers/estimateController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', estimateController.create);
router.get('/', estimateController.getAll);
router.get('/:id', estimateController.getById);
router.put('/:id', estimateController.update);
router.delete('/:id', estimateController.delete);

module.exports = router;
