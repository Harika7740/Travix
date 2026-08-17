const admin = require('firebase-admin');

// In-memory mock database store for seamless execution without GCP credentials
const mockStore = {
  users: new Map([
    ['usr_99812', {
      uid: 'usr_99812',
      email: 'user@example.com',
      fullName: 'Jane Doe',
      phone: '+1234567890',
      gender: 'female',
      role: 'passenger',
      safetyPreferences: { voiceSosEnabled: true, guardianModeAutoStart: true, nightModeProtection: true, femaleDriverPriority: true },
      emergencyContacts: [{ contactId: 'c_1', name: 'Sarah Doe', phone: '+1555019283', relation: 'Sister' }]
    }]
  ]),
  drivers: new Map([
    ['drv_44102', {
      uid: 'drv_44102',
      email: 'driver@example.com',
      fullName: 'Sarah Smith',
      phone: '+1987654321',
      gender: 'female',
      role: 'driver',
      isOnline: true,
      verificationStatus: 'approved',
      vehicle: { make: 'Toyota', model: 'Camry', year: 2022, plateNumber: 'TRX-8899', color: 'Silver' },
      rating: 4.9,
      totalTrips: 342,
      totalEarnings: 4820.50,
      location: { lat: 37.7749, lng: -122.4194 }
    }],
    ['drv_10203', {
      uid: 'drv_10203',
      email: 'john.driver@example.com',
      fullName: 'John Miller',
      phone: '+1555999000',
      gender: 'male',
      role: 'driver',
      isOnline: false,
      verificationStatus: 'pending',
      vehicle: { make: 'Honda', model: 'Accord', year: 2021, plateNumber: 'TRX-1090', color: 'Black' },
      rating: 4.7,
      totalTrips: 120,
      totalEarnings: 1540.00,
      location: { lat: 37.7833, lng: -122.4167 }
    }]
  ]),
  rides: new Map([
    ['ride_8819', {
      rideId: 'ride_8819',
      passengerId: 'usr_99812',
      driverId: 'drv_44102',
      status: 'in_progress',
      pickup: { lat: 37.7749, lng: -122.4194, address: '742 Market St, San Francisco' },
      dropoff: { lat: 37.7833, lng: -122.4167, address: 'Union Square, San Francisco' },
      fare: { amount: 18.50, currency: 'USD', paymentMethod: 'card', paymentStatus: 'paid' },
      safetyFlags: { femalePriorityRequested: true, guardianModeActive: true, nightModeActive: false, sosTriggered: false },
      createdAt: new Date().toISOString()
    }]
  ]),
  sosAlerts: new Map([
    ['sos_3301', {
      alertId: 'sos_3301',
      rideId: 'ride_8819',
      userId: 'usr_99812',
      triggerType: 'voice_keyword',
      location: { lat: 37.7780, lng: -122.4180 },
      status: 'active',
      createdAt: new Date().toISOString()
    }]
  ]),
  unsafeZones: new Map([
    ['zone_01', {
      zoneId: 'zone_01',
      name: 'Central Metro High-Risk Corridor',
      center: { lat: 37.7812, lng: -122.4111 },
      radiusMeters: 600,
      severity: 'high',
      activeTimes: '22:00 - 05:00'
    }]
  ])
};

let db = null;
let isFirebaseInitialized = false;

try {
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    db = admin.firestore();
    isFirebaseInitialized = true;
    console.log('[FIREBASE] Admin SDK successfully connected to Cloud Firestore.');
  } else {
    console.log('[FIREBASE] Environment credentials not provided. Using active mock data layer.');
  }
} catch (error) {
  console.warn('[FIREBASE] Initialization notice:', error.message);
}

module.exports = {
  admin,
  db,
  isFirebaseInitialized,
  mockStore
};
