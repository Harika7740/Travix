const { mockStore } = require('../config/firebase');

/**
 * Estimate Fare
 */
exports.estimateFare = async (req, res) => {
  try {
    const { pickup, dropoff, femaleDriverPriority } = req.body;

    if (!pickup || !dropoff) {
      return res.status(400).json({ success: false, message: 'Pickup and dropoff locations required' });
    }

    // Distance calculation logic (mock Haversine formula)
    const lat1 = pickup.lat || 37.7749;
    const lng1 = pickup.lng || -122.4194;
    const lat2 = dropoff.lat || 37.7833;
    const lng2 = dropoff.lng || -122.4167;

    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distanceKm = Math.round((R * c) * 10) / 10;
    if (distanceKm < 1) distanceKm = 3.5;

    const durationMins = Math.round(distanceKm * 3.2);

    const baseFare = 5.00;
    const perKmRate = 1.80;
    const perMinRate = 0.40;

    let subtotal = baseFare + (distanceKm * perKmRate) + (durationMins * perMinRate);

    // Night mode check (10 PM to 6 AM)
    const currentHour = new Date().getHours();
    const isNightMode = currentHour >= 22 || currentHour < 6;
    const nightModeSurge = isNightMode ? 3.00 : 0.00;

    const femalePriorityFee = 0.00; // Free security feature
    const totalFare = Math.round((subtotal + nightModeSurge) * 100) / 100;

    res.json({
      success: true,
      estimation: {
        distanceKm,
        durationMins,
        baseFare: 5.00,
        distanceCharge: Math.round((distanceKm * perKmRate) * 100) / 100,
        timeCharge: Math.round((durationMins * perMinRate) * 100) / 100,
        nightModeSurge,
        femalePriorityFee,
        totalFare,
        currency: 'USD',
        isNightModeActive: isNightMode
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Request Ride
 */
exports.requestRide = async (req, res) => {
  try {
    const { pickup, dropoff, fare, femaleDriverPriority, guardianModeEnabled } = req.body;
    const passengerId = req.user.uid || 'usr_99812';

    const rideId = 'ride_' + Date.now().toString(36);

    // Match driver: search for female driver if requested
    let matchedDriver = null;
    for (let driver of mockStore.drivers.values()) {
      if (driver.isOnline && driver.verificationStatus === 'approved') {
        if (femaleDriverPriority) {
          if (driver.gender === 'female') { matchedDriver = driver; break; }
        } else {
          matchedDriver = driver;
          break;
        }
      }
    }

    if (!matchedDriver) {
      // Fall back to first approved driver
      matchedDriver = Array.from(mockStore.drivers.values()).find(d => d.verificationStatus === 'approved') || Array.from(mockStore.drivers.values())[0];
    }

    const newRide = {
      rideId,
      passengerId,
      driverId: matchedDriver.uid,
      driver: {
        fullName: matchedDriver.fullName,
        phone: matchedDriver.phone,
        rating: matchedDriver.rating,
        vehicle: matchedDriver.vehicle,
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
      },
      status: 'accepted',
      pickup: pickup || { lat: 37.7749, lng: -122.4194, address: 'Market St, San Francisco' },
      dropoff: dropoff || { lat: 37.7833, lng: -122.4167, address: 'Union Square, San Francisco' },
      fare: {
        amount: fare || 18.50,
        currency: 'USD',
        paymentMethod: 'card',
        paymentStatus: 'pending'
      },
      safetyFlags: {
        femalePriorityRequested: !!femaleDriverPriority,
        guardianModeActive: !!guardianModeEnabled,
        nightModeActive: new Date().getHours() >= 22 || new Date().getHours() < 6,
        sosTriggered: false
      },
      trackingLink: `http://localhost:5000/track/${rideId}`,
      createdAt: new Date().toISOString()
    };

    mockStore.rides.set(rideId, newRide);

    res.status(201).json({
      success: true,
      message: 'Ride requested and driver assigned successfully',
      ride: newRide
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Driver Respond to Ride Request
 */
exports.respondToRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { action } = req.body; // 'accept' or 'reject'

    const ride = mockStore.rides.get(rideId);
    if (!ride) {
      return res.status(404).json({ success: false, message: 'Ride not found' });
    }

    if (action === 'accept') {
      ride.status = 'accepted';
    } else {
      ride.status = 'rejected';
      ride.driverId = null;
    }

    mockStore.rides.set(rideId, ride);

    res.json({
      success: true,
      message: `Ride ${action}ed successfully`,
      ride
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update Ride Status
 */
exports.updateRideStatus = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { status } = req.body; // 'arrived', 'in_progress', 'completed', 'cancelled'

    const ride = mockStore.rides.get(rideId);
    if (!ride) {
      return res.status(404).json({ success: false, message: 'Ride not found' });
    }

    ride.status = status;
    if (status === 'completed') {
      ride.fare.paymentStatus = 'paid';
      ride.completedAt = new Date().toISOString();
    }

    mockStore.rides.set(rideId, ride);

    res.json({ success: true, message: `Ride status updated to ${status}`, ride });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get User / Driver Ride History
 */
exports.getRideHistory = async (req, res) => {
  try {
    const { uid, role } = req.user;
    const rides = Array.from(mockStore.rides.values());

    let filtered = rides;
    if (role === 'passenger') {
      filtered = rides.filter(r => r.passengerId === uid || r.passengerId === 'usr_99812');
    } else if (role === 'driver') {
      filtered = rides.filter(r => r.driverId === uid || r.driverId === 'drv_44102');
    }

    res.json({ success: true, rides: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
