const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/analytics', authenticateToken, adminController.getAnalytics);
router.get('/drivers', authenticateToken, adminController.getDrivers);
router.put('/drivers/:driverId/verify', authenticateToken, adminController.verifyDriver);
router.get('/unsafe-zones', authenticateToken, adminController.getUnsafeZones);
router.post('/unsafe-zones', authenticateToken, adminController.createUnsafeZone);
router.put('/sos/:alertId/resolve', authenticateToken, adminController.resolveSOS);

module.exports = router;
