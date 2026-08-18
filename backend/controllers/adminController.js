const { mockStore } = require('../config/firebase');

/**
 * Get Admin Dashboard Analytics & Metrics
 */
exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = mockStore.users.size;
    const totalDrivers = mockStore.drivers.size;
    const pendingVerifications = Array.from(mockStore.drivers.values()).filter(d => d.verificationStatus === 'pending').length;

    const rides = Array.from(mockStore.rides.values());
    const activeRides = rides.filter(r => r.status === 'in_progress' || r.status === 'accepted' || r.status === 'arrived').length;
    const completedRides = rides.filter(r => r.status === 'completed').length;
    const totalRevenue = rides.reduce((sum, r) => sum + (r.fare ? r.fare.amount : 0), 0);

    const activeSosAlerts = Array.from(mockStore.sosAlerts.values()).filter(a => a.status === 'active').length;

    res.json({
      success: true,
      analytics: {
        totalUsers,
        totalDrivers,
        pendingVerifications,
        activeRides,
        completedRides,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        activeSosAlerts,
        unsafeZonesCount: mockStore.unsafeZones.size
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Manage Drivers & Verification Status
 */
exports.getDrivers = async (req, res) => {
  try {
    const drivers = Array.from(mockStore.drivers.values());
    res.json({ success: true, drivers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyDriver = async (req, res) => {
  try {
    const { driverId } = req.params;
    const { status, notes } = req.body; // 'approved' or 'rejected'

    const driver = mockStore.drivers.get(driverId);
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    driver.verificationStatus = status;
    driver.verificationNotes = notes || 'Verified by Admin';
    mockStore.drivers.set(driverId, driver);

    res.json({ success: true, message: `Driver verification status updated to ${status}`, driver });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get Unsafe Zones
 */
exports.getUnsafeZones = async (req, res) => {
  try {
    const zones = Array.from(mockStore.unsafeZones.values());
    res.json({ success: true, unsafeZones: zones });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Add / Create Unsafe Zone Geofence
 */
exports.createUnsafeZone = async (req, res) => {
  try {
    const { name, center, radiusMeters, severity, activeTimes } = req.body;

    const zoneId = 'zone_' + Date.now().toString(36);
    const newZone = {
      zoneId,
      name: name || 'High Alert Zone',
      center: center || { lat: 37.7812, lng: -122.4111 },
      radiusMeters: radiusMeters || 500,
      severity: severity || 'high',
      activeTimes: activeTimes || '22:00 - 05:00',
      createdAt: new Date().toISOString()
    };

    mockStore.unsafeZones.set(zoneId, newZone);

    res.status(201).json({ success: true, message: 'Unsafe zone geofence created successfully', zone: newZone });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Resolve SOS Alert
 */
exports.resolveSOS = async (req, res) => {
  try {
    const { alertId } = req.params;

    const alert = mockStore.sosAlerts.get(alertId);
    if (!alert) {
      return res.status(404).json({ success: false, message: 'SOS Alert not found' });
    }

    alert.status = 'resolved';
    alert.resolvedAt = new Date().toISOString();
    mockStore.sosAlerts.set(alertId, alert);

    res.json({ success: true, message: 'SOS Alert marked as resolved', alert });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
