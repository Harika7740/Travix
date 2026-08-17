const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');
const { authenticateToken } = require('../middleware/auth');

router.post('/estimate', authenticateToken, rideController.estimateFare);
router.post('/request', authenticateToken, rideController.requestRide);
router.put('/:rideId/respond', authenticateToken, rideController.respondToRide);
router.put('/:rideId/status', authenticateToken, rideController.updateRideStatus);
router.get('/history', authenticateToken, rideController.getRideHistory);

module.exports = router;
