const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', currencyController.create);
router.get('/', currencyController.getAll);
router.get('/active', currencyController.getActive);
router.get('/base', currencyController.getBase);
router.post('/convert', currencyController.convert);
router.get('/:id', currencyController.getById);
router.put('/:id', currencyController.update);
router.delete('/:id', currencyController.delete);

module.exports = router;
