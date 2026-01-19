const express = require('express');
const router = express.Router();
const auditLogController = require('../controllers/auditLogController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', auditLogController.getAll);
router.get('/recent', auditLogController.getRecent);
router.get('/user/:userId', auditLogController.getByUser);
router.get('/action/:action', auditLogController.getByAction);
router.get('/:id', auditLogController.getById);
router.get('/entity/:entityType/:entityId', auditLogController.getByEntity);

module.exports = router;
