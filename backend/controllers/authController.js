const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { mockStore, db, isFirebaseInitialized } = require('../config/firebase');
const { JWT_SECRET } = require('../middleware/auth');

/**
 * Register User / Passenger
 */
exports.registerUser = async (req, res) => {
  try {
    const { email, password, fullName, phone, gender } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ success: false, message: 'Email, password, and full name are required' });
    }

    const uid = 'usr_' + Date.now().toString(36);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      uid,
      email,
      fullName,
      phone: phone || '',
      gender: gender || 'unspecified',
      role: 'passenger',
      passwordHash: hashedPassword,
      safetyPreferences: {
        voiceSosEnabled: true,
        guardianModeAutoStart: true,
        nightModeProtection: true,
        femaleDriverPriority: gender === 'female'
      },
      emergencyContacts: [],
      createdAt: new Date().toISOString()
    };

    if (isFirebaseInitialized && db) {
      await db.collection('users').doc(uid).set(newUser);
    } else {
      mockStore.users.set(uid, newUser);
    }

    const token = jwt.sign({ uid, email, role: 'passenger', fullName }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: { uid, email, fullName, role: 'passenger', gender }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Register Driver
 */
exports.registerDriver = async (req, res) => {
  try {
    const { email, password, fullName, phone, gender, vehicle } = req.body;

    if (!email || !password || !fullName || !vehicle) {
      return res.status(400).json({ success: false, message: 'Missing required driver registration details' });
    }

    const uid = 'drv_' + Date.now().toString(36);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newDriver = {
      uid,
      email,
      fullName,
      phone: phone || '',
      gender: gender || 'unspecified',
      role: 'driver',
      passwordHash: hashedPassword,
      isOnline: false,
      verificationStatus: 'pending',
      vehicle: {
        make: vehicle.make || 'Toyota',
        model: vehicle.model || 'Camry',
        year: vehicle.year || 2022,
        plateNumber: vehicle.plateNumber || 'TRX-' + Math.floor(1000 + Math.random() * 9000),
        color: vehicle.color || 'Black'
      },
      documents: { licenseUrl: null, insuranceUrl: null, backgroundCheckUrl: null },
      rating: 5.0,
      totalTrips: 0,
      totalEarnings: 0,
      createdAt: new Date().toISOString()
    };

    if (isFirebaseInitialized && db) {
      await db.collection('drivers').doc(uid).set(newDriver);
    } else {
      mockStore.drivers.set(uid, newDriver);
    }

    const token = jwt.sign({ uid, email, role: 'driver', fullName }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'Driver registration submitted. Pending document verification.',
      token,
      driver: newDriver
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Login User / Driver / Admin
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Check admin hardcoded demo login
    if (email === 'admin@travix.com' && password === 'admin123') {
      const token = jwt.sign({ uid: 'adm_001', email, role: 'admin', fullName: 'System Administrator' }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        success: true,
        token,
        user: { uid: 'adm_001', email, role: 'admin', fullName: 'System Administrator' }
      });
    }

    let account = null;
    let role = 'passenger';

    // Check mockStore or DB
    for (let u of mockStore.users.values()) {
      if (u.email === email) { account = u; role = 'passenger'; break; }
    }
    if (!account) {
      for (let d of mockStore.drivers.values()) {
        if (d.email === email) { account = d; role = 'driver'; break; }
      }
    }

    if (!account) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ uid: account.uid, email: account.email, role, fullName: account.fullName }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      user: {
        uid: account.uid,
        email: account.email,
        fullName: account.fullName,
        role,
        gender: account.gender
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get Profile
 */
exports.getProfile = async (req, res) => {
  try {
    const { uid, role } = req.user;
    let profile = null;

    if (role === 'driver') {
      profile = mockStore.drivers.get(uid);
    } else {
      profile = mockStore.users.get(uid) || Array.from(mockStore.users.values())[0];
    }

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
