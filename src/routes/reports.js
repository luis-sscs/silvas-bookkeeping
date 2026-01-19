const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', reportController.create);
router.get('/', reportController.getAll);
router.get('/recent', reportController.getRecentReports);
router.get('/type/:type', reportController.getByType);
router.get('/:id', reportController.getById);
router.put('/:id', reportController.update);
router.delete('/:id', reportController.delete);

module.exports = router;
