const { mockStore } = require('../config/firebase');

/**
 * Trigger Voice / Manual SOS Emergency Alert
 */
exports.triggerSOS = async (req, res) => {
  try {
    const { rideId, location, triggerType } = req.body;
    const userId = req.user ? req.user.uid : 'usr_99812';

    const alertId = 'sos_' + Date.now().toString(36);

    const sosAlert = {
      alertId,
      rideId: rideId || 'ride_8819',
      userId,
      triggerType: triggerType || 'voice_keyword',
      location: location || { lat: 37.7780, lng: -122.4180 },
      status: 'active',
      user: {
        fullName: 'Jane Doe',
        phone: '+1234567890'
      },
      createdAt: new Date().toISOString()
    };

    mockStore.sosAlerts.set(alertId, sosAlert);

    // Update ride flags if active
    if (rideId && mockStore.rides.has(rideId)) {
      const ride = mockStore.rides.get(rideId);
      ride.safetyFlags.sosTriggered = true;
      mockStore.rides.set(rideId, ride);
    }

    res.status(201).json({
      success: true,
      message: 'CRITICAL EMERGENCY SOS TRIGGERED! Local emergency responders & guardian contacts notified.',
      sosAlert,
      notifiedContacts: [
        { name: 'Sarah Doe (Parent)', phone: '+1555019283', status: 'SMS & Live Stream Dispatched' },
        { name: 'TRAVIX 24/7 Security Command Center', status: 'Active Monitor Engaged' }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get Emergency Contacts
 */
exports.getEmergencyContacts = async (req, res) => {
  try {
    const uid = req.user ? req.user.uid : 'usr_99812';
    const user = mockStore.users.get(uid) || Array.from(mockStore.users.values())[0];

    res.json({
      success: true,
      contacts: user ? user.emergencyContacts : []
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Add / Update Emergency Contact
 */
exports.addEmergencyContact = async (req, res) => {
  try {
    const { name, phone, relation } = req.body;
    const uid = req.user ? req.user.uid : 'usr_99812';

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone number are required' });
    }

    const user = mockStore.users.get(uid) || Array.from(mockStore.users.values())[0];
    const newContact = {
      contactId: 'c_' + Date.now().toString(36),
      name,
      phone,
      relation: relation || 'Family'
    };

    user.emergencyContacts.push(newContact);
    mockStore.users.set(user.uid, user);

    res.status(201).json({
      success: true,
      message: 'Emergency contact added successfully',
      contact: newContact,
      allContacts: user.emergencyContacts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update Safety Preferences
 */
exports.updateSafetyPreferences = async (req, res) => {
  try {
    const { voiceSosEnabled, guardianModeAutoStart, nightModeProtection, femaleDriverPriority } = req.body;
    const uid = req.user ? req.user.uid : 'usr_99812';

    const user = mockStore.users.get(uid) || Array.from(mockStore.users.values())[0];
    user.safetyPreferences = {
      ...user.safetyPreferences,
      voiceSosEnabled: voiceSosEnabled !== undefined ? voiceSosEnabled : user.safetyPreferences.voiceSosEnabled,
      guardianModeAutoStart: guardianModeAutoStart !== undefined ? guardianModeAutoStart : user.safetyPreferences.guardianModeAutoStart,
      nightModeProtection: nightModeProtection !== undefined ? nightModeProtection : user.safetyPreferences.nightModeProtection,
      femaleDriverPriority: femaleDriverPriority !== undefined ? femaleDriverPriority : user.safetyPreferences.femaleDriverPriority
    };

    mockStore.users.set(user.uid, user);

    res.json({
      success: true,
      message: 'Safety preferences updated successfully',
      safetyPreferences: user.safetyPreferences
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
