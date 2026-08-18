const express = require('express');
const router = express.Router();
const safetyController = require('../controllers/safetyController');
const { authenticateToken } = require('../middleware/auth');

router.post('/sos', authenticateToken, safetyController.triggerSOS);
router.get('/contacts', authenticateToken, safetyController.getEmergencyContacts);
router.post('/contacts', authenticateToken, safetyController.addEmergencyContact);
router.put('/preferences', authenticateToken, safetyController.updateSafetyPreferences);

module.exports = router;
